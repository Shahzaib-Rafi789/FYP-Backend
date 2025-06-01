

/**
 * Converts percentage to IELTS band score (1-9 in 0.5 increments)
 * @param percentage The score percentage (0-100)
 * @returns IELTS band score (1, 1.5, 2, 2.5, ..., 9)
 */
export function calculateBandScore(percentage: number): number {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Percentage must be between 0 and 100');
    }
  
    // Fixed IELTS band score conversion with proper boundary handling
    const bandScores = [
      { threshold: 0, score: 1 },
      { threshold: 4.5, score: 1.5 },
      { threshold: 9.5, score: 2 },
      { threshold: 14.5, score: 2.5 },
      { threshold: 19.5, score: 3 },
      { threshold: 24.5, score: 3.5 },
      { threshold: 29.5, score: 4 },
      { threshold: 34.5, score: 4.5 },
      { threshold: 39.5, score: 5 },
      { threshold: 44.5, score: 5.5 },
      { threshold: 49.5, score: 6 },
      { threshold: 54.5, score: 6.5 },
      { threshold: 59.5, score: 7 },
      { threshold: 64.5, score: 7.5 },
      { threshold: 69.5, score: 8 },
      { threshold: 74.5, score: 8.5 },
      { threshold: 79.5, score: 9 }
    ];
  
    // Find the highest band where percentage >= threshold
    for (let i = bandScores.length - 1; i >= 0; i--) {
      if (percentage >= bandScores[i].threshold) {
        return bandScores[i].score;
      }
    }
  
    return 1; // Default for percentages below 4.5
  }