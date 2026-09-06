// src/services/duplicateWorkEngine.js

const STOP_WORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'construction',
  'development',
  'work',
  'project',
  'scheme',
  'of',
  'in',
  'at',
  'upgrade',
]);

function normalize(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value = '') {
  return normalize(value)
    .split(' ')
    .filter(Boolean)
    .filter((word) => !STOP_WORDS.has(word));
}

function tokenSimilarity(a = '', b = '') {
  const aTokens = new Set(tokens(a));
  const bTokens = new Set(tokens(b));

  if (!aTokens.size || !bTokens.size) return 0;

  const intersection = [...aTokens].filter((x) => bTokens.has(x)).length;
  const union = new Set([...aTokens, ...bTokens]).size;

  return union ? intersection / union : 0;
}

function amountSimilarity(a, b) {
  const first = Number(a || 0);
  const second = Number(b || 0);

  if (!first || !second) return 0;

  const ratio = Math.min(first, second) / Math.max(first, second);

  if (ratio >= 0.9) return 100;
  if (ratio >= 0.75) return 80;
  if (ratio >= 0.6) return 60;
  if (ratio >= 0.45) return 40;

  return 15;
}

function categorySimilarity(a, b) {
  const first = normalize(a);
  const second = normalize(b);

  if (!first || !second) return 0;
  if (first === second) return 100;

  const similarity = tokenSimilarity(first, second);

  return Math.round(similarity * 100);
}

function vendorSimilarity(a, b) {
  if (!a || !b) return 0;
  return a === b ? 100 : 0;
}

function agencySimilarity(a, b) {
  if (!a || !b) return 0;
  return normalize(a) === normalize(b) ? 100 : 0;
}

function locationSimilarity(a, b) {
  if (!a || !b) return 0;

  const first = normalize(`${a.state || ''} ${a.district || ''}`);
  const second = normalize(`${b.state || ''} ${b.district || ''}`);

  if (first === second) return 100;

  if (
    normalize(a.state) &&
    normalize(a.state) === normalize(b.state)
  ) {
    return 45;
  }

  return 0;
}

function timelineSimilarity(a, b) {
  const aStart = a.startDate || a.start || a.date;
  const bStart = b.startDate || b.start || b.date;

  const aEnd = a.endDate || a.end;
  const bEnd = b.endDate || b.end;

  if (!aStart || !bStart) return 0;

  const startA = new Date(aStart);
  const startB = new Date(bStart);

  if (Number.isNaN(startA.getTime()) || Number.isNaN(startB.getTime())) {
    return 0;
  }

  const differenceDays =
    Math.abs(startA.getTime() - startB.getTime()) /
    (1000 * 60 * 60 * 24);

  if (aEnd && bEnd) {
    const endA = new Date(aEnd);
    const endB = new Date(bEnd);

    if (!Number.isNaN(endA.getTime()) && !Number.isNaN(endB.getTime())) {
      const overlap =
        Math.min(endA.getTime(), endB.getTime()) -
        Math.max(startA.getTime(), startB.getTime());

      if (overlap > 0) return 100;
    }
  }

  if (differenceDays <= 30) return 90;
  if (differenceDays <= 90) return 70;
  if (differenceDays <= 180) return 40;

  return 10;
}

function getDescription(project) {
  return [
    project.name,
    project.description,
    project.workDescription,
    project.finding,
    project.category,
  ]
    .filter(Boolean)
    .join(' ');
}

function classify(score) {
  if (score >= 75) {
    return {
      label: 'Possible Duplicate',
      severity: 'high',
      colorClass: 'duplicate-high',
    };
  }

  if (score >= 55) {
    return {
      label: 'Potential Overlap',
      severity: 'medium',
      colorClass: 'duplicate-medium',
    };
  }

  if (score >= 35) {
    return {
      label: 'Related Work',
      severity: 'low',
      colorClass: 'duplicate-low',
    };
  }

  return {
    label: 'Low Similarity',
    severity: 'clear',
    colorClass: 'duplicate-clear',
  };
}

export function compareProjects(project, candidate) {
  if (!project || !candidate || project.id === candidate.id) {
    return null;
  }

  const location = locationSimilarity(project, candidate);

  const category = categorySimilarity(
    project.category,
    candidate.category
  );

  const description = Math.round(
    tokenSimilarity(
      getDescription(project),
      getDescription(candidate)
    ) * 100
  );

  const cost = amountSimilarity(
    project.amount ||
      project.sanction?.sanctionedAmount ||
      project.sanctionedAmount,

    candidate.amount ||
      candidate.sanction?.sanctionedAmount ||
      candidate.sanctionedAmount
  );

  const vendor = vendorSimilarity(
    project.vendorId,
    candidate.vendorId
  );

  const agency = agencySimilarity(
    project.agency,
    candidate.agency
  );

  const timeline = timelineSimilarity(
    project.timeline || project,
    candidate.timeline || candidate
  );

  /*
   * Explainable weighted similarity.
   *
   * Location      25%
   * Category      20%
   * Description   15%
   * Cost          10%
   * Vendor        15%
   * Agency        5%
   * Timeline      10%
   */

  const score = Math.round(
    location * 0.25 +
      category * 0.2 +
      description * 0.15 +
      cost * 0.1 +
      vendor * 0.15 +
      agency * 0.05 +
      timeline * 0.1
  );

  const classification = classify(score);

  const reasons = [];

  if (location >= 90) {
    reasons.push('Same state and district');
  } else if (location >= 40) {
    reasons.push('Same state');
  }

  if (category >= 90) {
    reasons.push('Same work category');
  } else if (category >= 50) {
    reasons.push('Similar work category');
  }

  if (description >= 60) {
    reasons.push('Similar project description');
  }

  if (cost >= 75) {
    reasons.push('Comparable sanctioned value');
  }

  if (vendor >= 100) {
    reasons.push('Same implementing vendor');
  }

  if (agency >= 100) {
    reasons.push('Same implementing agency');
  }

  if (timeline >= 70) {
    reasons.push('Overlapping execution timeline');
  }

  return {
    projectId: project.id,
    candidateId: candidate.id,
    score,
    ...classification,

    signals: {
      location,
      category,
      description,
      cost,
      vendor,
      agency,
      timeline,
    },

    reasons,

    explanation:
      reasons.length > 0
        ? reasons.join(' • ')
        : 'Limited similarity detected across available project attributes.',
  };
}

export function findRelatedProjects(project, projects = []) {
  if (!project) return [];

  return projects
    .filter((candidate) => candidate.id !== project.id)
    .map((candidate) => ({
      candidate,
      comparison: compareProjects(project, candidate),
    }))
    .filter((item) => item.comparison)
    .filter((item) => item.comparison.score >= 25)
    .sort(
      (a, b) =>
        b.comparison.score - a.comparison.score
    );
}

export default findRelatedProjects;