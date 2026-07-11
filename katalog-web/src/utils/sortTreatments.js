export const getCategoryScore = (name) => {
  const lowerName = (name || '').toLowerCase();
  
  // 3. Badan & Massage
  if (lowerName.includes('badan') || lowerName.includes('massage') || lowerName.includes('body')) {
    return 3;
  }
  
  // 2. Satuan
  if (lowerName.includes('tunggal') || lowerName.includes('satuan')) {
    return 2;
  }
  
  // 1. Paket (Everything else)
  return 1;
};

export const sortTreatments = (treatments) => {
  return [...treatments].sort((a, b) => {
    const scoreA = getCategoryScore(a.name);
    const scoreB = getCategoryScore(b.name);
    
    // Sort by category score first
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }
    
    // Keep internal order or simple fallback
    return 0; 
  });
};
