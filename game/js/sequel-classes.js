/* The new callings unlock when their homeland becomes playable. */
(() => {
  const make = (group, rows) => rows.map(([id, name, icon, accent, hp, attack, portrait, skill, skillText, power]) => ({
    id, name, icon, accent, hp, attack, portrait, skill, skillText, power,
    minChapter: group, origin: ["Nacre", "Aurive", "Orrée"][group - 1],
  }));
  window.TF_CLASSES.push(
    ...make(1, [
      ["plongeur-nacre", "Plongeur de Nacre", "⚓", "#62b6b3", 21, 13, "ronin", "Harpon de rappel", "Inflige 125 % de l’attaque et interrompt l’ennemi ce tour.", { strike: 1.25, stun: 1 }],
      ["sonneur", "Sonneur de Sel", "♬", "#b8d3dd", 19, 12, "bard", "Contrechant", "Interrompt l’ennemi pendant deux tours. Votre prochaine attaque est doublée.", { stun: 2, boost: 2, hits: 1 }],
      ["vitrieuse", "Verrière des Docks", "◇", "#9de3cb", 16, 15, "artificier", "Éclat prismatique", "Inflige 210 % de l’attaque et ignore la garde spéciale.", { strike: 2.1, bypass: true }],
      ["veilleuse-nacre", "Veilleuse de la Digue", "⬟", "#99baa1", 25, 11, "huskarl", "Ancre levée", "Réduit de 75 % les deux prochains coups et rend 20 % des PV max.", { guard: 0.75, turns: 2, heal: 0.2 }],
      ["herboriste-corail", "Herboriste de Corail", "✿", "#ed9daa", 18, 13, "miko", "Rosée de Corail", "Rend 25 % des PV max et recharge une potion si une place est libre.", { heal: 0.25, potion: 1 }],
    ]),
    ...make(2, [
      ["sablier", "Horloger d’Aurive", "⌛", "#e3ba76", 17, 14, "sorcier", "Minute dérobée", "Inflige 80 % de l’attaque, prive l’ennemi de deux tours et dissipe la corruption des potions.", { strike: 0.8, stun: 2, cleanse: true }],
      ["caravanier", "Guide des Caravanes", "✧", "#dca976", 23, 13, "archer", "Course sous le sable", "Esquive le prochain coup et augmente les deux prochaines attaques de 55 %.", { dodge: 1, boost: 1.55, hits: 2 }],
      ["miroitier", "Miroitier du Midi", "☼", "#ecd872", 18, 15, "onmyoji", "Renvoi du Midi", "Inflige 180 % de l’attaque si une frappe lourde est annoncée, 110 % sinon. Réduit le prochain coup de 50 %.", { strike: 1.1, heavyStrike: 1.8, guard: 0.5, turns: 1 }],
      ["nomade-cuivre", "Gardienne des Citernes", "▣", "#d88f68", 27, 11, "chevalier", "Sceau de Cuivre", "Réduit de 80 % les trois prochains coups.", { guard: 0.8, turns: 3 }],
      ["archiviste", "Archiviste des Heures", "▤", "#c5a0db", 18, 12, "moine", "Note en Marge", "Dissipe la corruption, recharge une potion et double la prochaine attaque.", { cleanse: true, potion: 1, boost: 2, hits: 1 }],
    ]),
    ...make(3, [
      ["arpenteur-ciel", "Arpenteuse du Ciel", "➶", "#b4aff8", 21, 15, "archer", "Pont de traverse", "Inflige 140 % de l’attaque et esquive les deux prochains coups.", { strike: 1.4, dodge: 2 }],
      ["greffier", "Greffière d’Orrée", "❋", "#9ed8a8", 22, 12, "seidr", "Greffe vive", "Rend 40 % des PV max et réduit les deux prochains coups de 45 %.", { heal: 0.4, guard: 0.45, turns: 2 }],
      ["forge-astre", "Forgeron d’Astre", "✷", "#eaa1cb", 25, 14, "artificier", "Ancrage rompu", "Inflige 170 % de l’attaque et retire 1 point d’attaque à l’ennemi pour le combat.", { strike: 1.7, weaken: 1 }],
      ["heraut-echos", "Héraut des Échos", "♪", "#aebafa", 18, 15, "skald", "Triple écho", "Inflige 130 % de l’attaque et augmente les deux prochaines frappes de 35 %.", { strike: 1.3, boost: 1.35, hits: 2 }],
      ["gardien-ponts", "Gardien du Dernier Pont", "✦", "#e8c9a1", 29, 12, "valkyrie", "Serment des Ponts", "Rend 20 % des PV max, interrompt l’ennemi ce tour et ignore sa garde spéciale en infligeant 150 % de l’attaque.", { strike: 1.5, heal: 0.2, stun: 1, bypass: true }],
    ]),
  );
})();
