const cardFilterExtractor = (query: any): any => {
  const { rarity, skills, tribe, temple } = query
  const filters: any = {}

  if (rarity) filters.rarity = rarity
  if (skills) filters.skills = { $in: skills }
  if (tribe) filters.tribe = tribe
  if (temple) filters.temple = temple

  return filters
}

export default cardFilterExtractor
