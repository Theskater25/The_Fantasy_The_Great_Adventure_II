(() => {
  const content = window.TF_CONTENT;
  const actsByChapter = [window.TF_ACTS_IV, window.TF_ACTS_V, window.TF_ACTS_VI];
  const backgrounds = {
    mist: "Rives de Nacre", cave: "Galeries", ruins: "Rues anciennes", moor: "Remparts",
    castle: "Salles fermées", lava: "Ateliers", mountain: "Passages hauts", aurora: "Ciels d’Orrée",
    courtyard: "Cours et refuges", forest: "Jardins", graveyard: "Enclos du souvenir", "ice-cave": "Porte du Nord",
  };
  const cue = {
    surge: "Le boss annonce ses assauts rapprochés. Gardez une défense pour les tours où la frappe est indiquée.",
    armor: "Le boss abaisse sa visière à intervalles réguliers. Préparez votre attaque pendant qu’il se couvre.",
    pierce: "Le boss arme une frappe qui traverse une partie de la défense. Gardez vos PV en réserve.",
    hex: "La frappe lourde du boss affaiblit votre prochaine potion. Préparez vos soins avant son attaque.",
  };
  const option = (label, outcome, effects) => ({ label, outcome, ...effects });
  const patterns = [
    [option("Inspecter les lieux", "Vous relevez un détail qui aidera votre guide au prochain duel.", { intel: 1 }), option("Prendre les devants", "Vous prenez de l’avance et gagnez 6 XP supplémentaires.", { xp: 6 })],
    [option("Chercher des provisions", "Vous ajoutez une potion à vos réserves si votre sac a de la place.", { supply: 1 }), option("Observer les allées et venues", "Votre guide comprend où placer son intervention.", { intel: 1 })],
    [option("S’avancer pour enquêter", "Votre présence attire un adversaire du secteur.", { encounter: "local" }), option("Contourner le passage", "Votre guide vous aide à repérer un chemin discret.", { intel: 1 })],
    [option("Prendre le temps d’aider", "Vous obtenez un renseignement et gagnez 4 XP supplémentaires.", { intel: 1, xp: 4 }), option("Faire une halte à l’écart", "Vous vous éloignez du passage pour soigner vos blessures.", { healRatio: 0.2 })],
    [option("Garder la trace pour le journal", "Vous préparez la prochaine intervention de votre guide.", { intel: 1 }), option("Se ravitailler", "Vous remplissez une fiole si vous avez de la place.", { supply: 1 })],
    [option("Distraire la sentinelle", "Une sentinelle vous intercepte. La voie sera plus sûre si vous la battez.", { encounter: "local", intel: 1 }), option("Rester hors de vue", "Vous profitez de l’attente pour récupérer des forces.", { healRatio: 0.16 })],
    [option("Poursuivre la piste", "Votre guide note le point faible qu’elle révèle.", { intel: 1 }), option("Sécuriser le passage", "Vous protégez la retraite et gagnez 6 XP supplémentaires.", { xp: 6 })],
    [option("Partager les réserves", "On vous offre de quoi soigner une partie de vos blessures.", { healRatio: 0.24 }), option("Demander un renseignement", "Votre guide sait désormais un peu mieux où intervenir.", { intel: 1 })],
  ];

  const locals = [
    [["Veilleur de vase", "zombie"], ["Rôdeur des écluses", "goblin"], ["Garde de l’Armateur", "raiders"]],
    [["Statue de la citerne", "skeleton"], ["Porteur de reflets", "goblin"], ["Pillards de l’ombre", "raiders"]],
    [["Feuille vive", "rat"], ["Ombre suspendue", "skeleton"], ["Collecteurs de racines", "raiders"]],
  ];

  for (const chapter of content.chapters) {
    chapter.enemies = locals[chapter.id - 1].map(([name, sprite]) =>
      ({ name, type: "basique", asset: `assets/enemies/sprites/${sprite}.png` }));
    const acts = actsByChapter[chapter.id - 1];
    const opening = chapter.scenes[0];
    const ending = chapter.scenes.at(-1);
    chapter.interval = 20;
    chapter.offset = actsByChapter.slice(0, chapter.id - 1).reduce((count, list) => count + list.length, 0);
    chapter.acts = [];
    chapter.bosses = [];
    chapter.scenes = [];

    acts.forEach(([title, backdrop, name, sprite, pattern, script], actIndex) => {
      const rank = chapter.offset + actIndex + 1;
      const boss = {
        name, type: "boss", pattern, rank,
        asset: globalThis.TF_CAMPAIGN_ART?.bosses[name]?.src || `assets/enemies/sprites/${sprite}.png`,
        hp: Math.round(48 + 6 * rank + 0.09 * rank * rank),
        attack: Math.round(6 + 0.66 * rank),
      };
      const moments = script.trim().split(/[|\n]/).map((line) => line.trim()).filter(Boolean);
      if (moments.length !== chapter.interval) throw new Error(`${title} : ${moments.length} scènes au lieu de ${chapter.interval}.`);
      chapter.acts.push({ title, backdrop, boss: name, pattern, cue: cue[pattern] });
      chapter.bosses.push(boss);
      moments.forEach((moment, index) => {
        const step = actIndex * chapter.interval + index + 1;
        const sceneInAct = index + 1;
        let choices = patterns[(index * 3 + actIndex + chapter.id) % patterns.length];
        if (index === 1 || index === 2) {
          choices = [option("Préparer l’intervention", "Votre guide choisit comment intervenir dans ce secteur.", { intel: 1 }),
            option("Vérifier les issues", "Vous repérez un détour et gagnez 6 XP supplémentaires.", { xp: 6 })];
        } else if (index === 16) {
          choices = [option("Accompagner votre guide", "Vous aidez votre guide. Il vous remet sa relique la première fois dans ce chapitre.", { quest: true, intel: 1 }),
            option("Se préparer au duel", "Vous renoncez à cette occasion pour soigner 30 % de vos PV max.", { healRatio: 0.3 })];
        } else if (index === 19) {
          choices = [option("Achever les préparatifs", "Ce repérage peut déclencher l’aide du guide pendant le duel.", { intel: 1 }),
            option("Prendre une dernière fiole", "Vous remplissez une fiole avant le duel si votre sac a de la place.", { supply: 1 })];
        }
        const entry = {
          act: actIndex, sceneInAct, decor: backgrounds[backdrop], backdrop,
          text: `${moment}. ${index === 19 ? cue[pattern] : "Que faites-vous ?"}`,
          choices: { yes: choices[0], no: choices[1] },
        };
        if (step === 1) Object.assign(entry, opening);
        if (step === acts.length * chapter.interval) Object.assign(entry, ending);
        chapter.scenes.push(entry);
      });
    });

    chapter.quest = ["L’aide du guide", "À l’étape 17 de chaque secteur, accompagnez votre guide pour obtenir sa relique une fois par chapitre. Trois indices avant le duel suffisent pour déclencher son soutien."];
    for (const [routeId, route] of Object.entries(chapter.routes)) {
      const firstRouteScenes = route.scenes;
      route.scenes = Object.fromEntries(chapter.scenes.flatMap((entry, index) => {
        const step = index + 1;
        if (entry.sceneInAct !== 2 && entry.sceneInAct !== 3) return [];
        if (step === 2 || step === 3) return [[step, { ...entry, ...firstRouteScenes[step] }]];
        const isFirstRoute = routeId === Object.keys(chapter.routes)[0];
        const choices = entry.sceneInAct === 2
          ? { yes: option(`Suivre ${route.ally}`, "Votre guide obtient un renseignement au sujet du boss.", { intel: 1 }),
              no: option("Faire le tour du secteur", "Vous découvrez un abri et récupérez une partie de vos forces.", { healRatio: 0.22 }) }
          : { yes: option(isFirstRoute ? "Prendre le passage direct" : "Ouvrir le chemin secondaire", "Vous allez à la rencontre du gardien local.", { encounter: "local", xp: 5 }),
              no: option("Emprunter le détour", "Vous évitez le combat et ramassez une fiole sur la route.", { supply: 1 }) };
        return [[step, { ...entry, text: `${entry.text.replace(" Que faites-vous ?", "")} ${route.ally} propose ${isFirstRoute ? "de couper à travers le secteur" : "d’emprunter les passages de service"}.`, choices }]];
      }));
    }
    chapter.tone = `${chapter.scenes.length} décisions · ${chapter.bosses.length} secteurs`;
  }

  content.storyVersion = "great-adventure-ii-campaign-1";
  const goal = (id, icon, title, description, tier, category, rule, optional = false) =>
    ({ id, icon, title, description, tier, category, goal: rule, optional });
  content.achievements = [
    goal("platinum", "◆", "Légende des trois horizons", "Obtenir les trophées principaux de la campagne.", "platinum", "story", { type: "platinum" }),
    goal("first-boss", "⚔", "Premier duel", "Remporter un duel de secteur.", "bronze", "combat", { type: "bosses", target: 1 }),
    goal("ten-bosses", "♛", "La route des couronnes", "Vaincre dix boss distincts.", "silver", "combat", { type: "bosses", target: 10 }),
    goal("all-bosses", "☼", "Les trente gardiens", "Vaincre les trente boss distincts.", "gold", "combat", { type: "bosses", target: 30 }),
    ...content.chapters.map((chapter) =>
      goal(`finish-${chapter.id}`, "◆", chapter.title, `Terminer le chapitre ${chapter.roman}.`, chapter.id === 3 ? "gold" : "silver", "story", { type: "chapters", chapters: [chapter.id] })),
    goal("all-quests", "❋", "Trois guides, trois serments", "Accomplir la quête d’un guide dans chacun des trois chapitres.", "gold", "exploration", { type: "quests", target: 3 }),
    goal("all-routes", "➶", "Les six routes", "Terminer chaque chapitre par les deux routes proposées.", "gold", "exploration", { type: "routes", target: 6 }, true),
    goal("all-endings", "✦", "Mémoires alternatives", "Découvrir les deux épilogues de chacun des trois chapitres.", "gold", "story", { type: "endings", target: 6 }, true),
    goal("first-skill", "✷", "Premier talent", "Dépenser un point dans l’arbre de compétences.", "bronze", "growth", { type: "milestone", key: "skill" }),
    goal("specialty", "✧", "Maître d’une voie", "Choisir une spécialisation au chapitre VI.", "silver", "growth", { type: "milestone", key: "specialization" }, true),
    goal("level-20", "↑", "Vingt horizons", "Atteindre le niveau 20.", "silver", "growth", { type: "level", target: 20 }, true),
    ...content.classes.filter((hero) => hero.power).map((hero) =>
      goal(`class-${hero.id}`, hero.icon, hero.name, `Terminer un chapitre avec la classe ${hero.name}.`, "bronze", "collection", { type: "class", classId: hero.id }, true)),
  ];
})();
