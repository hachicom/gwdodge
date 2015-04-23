/**USAGE: 
 *  pt-br: glossary.UI.start['pt_BR'] ou glossary.UI.start[language]
 *  var language possui o idioma usado pelo device e selecionado pelo usuário
 */ 
var glossary = {
  UI: {
		start: { //glossary.UI.start[language]
      pt_BR: '[INICIAR]',
      en_US: '[START GAME]'
    },
		tutorial: { //glossary.UI.tutorial[language]
      pt_BR: '[COMO JOGAR]',
      en_US: '[TUTORIAL]'
    },
		settings: { //glossary.UI.settings[language]
      pt_BR: '[OPÇÕES]',
      en_US: '[SETTINGS]'
    },
		credits: { //glossary.UI.credits[language]
      pt_BR: '[CRÉDITOS]',
      en_US: '[CREDITS]'
    },
    optionsTxt :{ //glossary.UI.optionsTxt[language]
      pt_BR: '  ==CONFIGURAÇÔES==__SOM & BGM____REGIÃO/REGION____RESETAR HISCORE',
      en_US: '  ==OPTIONS MENU==__SFX & BGM____REGIÃO/REGION____RESET HISCORE'
    },
    sim :{ //glossary.UI.sim[language]
      pt_BR: '[SIM]',
      en_US: '[YES]'
    },
    nao :{ //glossary.UI.nao[language]
      pt_BR: '[NÃO]',
      en_US: '[NO]'
    },
    salvar :{ //glossary.UI.salvar[language]
      pt_BR: '[SALVAR]',
      en_US: '[ SAVE ]'
    },
    voltar :{ //glossary.UI.voltar[language]
      pt_BR: '[VOLTAR]',
      en_US: '[ BACK ]'
    },
    proximo :{ //glossary.UI.proximo[language]
      pt_BR: '[PRÓXIMO]',
      en_US: '[ NEXT ]'
    },
    fim :{ //glossary.UI.fim[language]
      pt_BR: '[  FIM  ]',
      en_US: '[  END  ]'
    }
	},
  text: {
		tutorialPg1: { //glossary.text.tutorialPg1[language]
      pt_BR: '  ==COMO JOGAR==__'
            +'Snow & Yuki é_um jogo estilo_Game & Watch_(minigame)!__'
            +'Use os direcionais_para mover Snow_pelo estágio__',
      en_US: '  ==HOW TO PLAY==__'
            +'Snow & Yuki is_a Game & Watch alike_game (LCD handheld)!__'
            +'Use directional pad_to move Snow_through the stage__'
    },
		tutorialPg2: { //glossary.text.tutorialPg2[language]
      pt_BR: '  ==COMO JOGAR==__Desvie do gelo____'
            +'Colete peixes____'
            +'Evite piranhas____'
            +'Cada fase requer uma_quantidade de peixes_a ser coletada.__Ao coletar os peixes_'
            +'leve-os para a Yuki_para passar de fase!_',
      en_US: '  ==HOW TO PLAY==__Avoid ice cubes____'
            +'Collect fish____'
            +'Avoid piranas____'
            +'Each stage requires_a quantity of fish_to be collected.__After collecting_'
            +'them, go to Yuki_to clear the stage!_'
    },
		tutorialPg3: { //glossary.text.tutorialPg3[language]
      pt_BR: '  ==COMO JOGAR==__Todo sétimo round_é um round bônus!_Colete corações_para ganhar pontos_______'
            +'Ganhe vida atingindo_a pontuação abaixo:__'
            +'->5000_->10000_->20000_->40000_->80000___Tente marcar 99999_pra zerar o jogo!',
      en_US: '  ==HOW TO PLAY==__Every 7th round_is a bonus round!_Collect hearts_to score points_______'
            +'Extra lives rewarded_at scores below:__'
            +'->5000_->10000_->20000_->40000_->80000___Try scoring 99999_to beat the game!'
    },
		peixe: { //glossary.text.peixe[language]
      pt_BR: 'PEIXE',
      en_US: 'FISH',
    },
		colete: { //glossary.text.colete[language]
      pt_BR: 'COLETE ',
      en_US: 'COLLECT '
    },
		peixes: { //glossary.text.peixes[language]
      pt_BR: ' PEIXES!',
      en_US: ' FISH!'
    },
		alertaYuki: { //glossary.text.alertaYuki[language]
      pt_BR: 'LEVE OS PEIXES_  PARA YUKI!!!',
      en_US: 'TAKE YOUR FISH_    TO YUKI!!!'
    },
		coracoes: { //glossary.text.coracoes[language]
      pt_BR: ' CORAçÕES: ',
      en_US: '   HEARTS: '
    },
    gameoverHint1: { //glossary.text.gameoverHint1[language]
      pt_BR: 'DICA: Tente pegar as_piranhas pela cauda,_vale 100 pontos!',
      en_US: 'HINT: Try getting_piranas by tail,_scores 100 points!'
    },
    gameoverHint2: { //glossary.text.gameoverHint2[language]
      pt_BR: 'DICA: A cambalhota_de uma piranha pode_quebrar os cubos_de gelo!',
      en_US: "HINT: Pirana's_somersault can break_ice cubes!"
    },
    gameoverHint3: { //glossary.text.gameoverHint3[language]
      pt_BR: 'DICA: Snow não pode_pegar mais peixes_que o necessário_para passar de fase!',
      en_US: "HINT: Snow can't get_more fish than stage_requirement!"
    },
    gameoverHint4: { //glossary.text.gameoverHint4[language]
      pt_BR: 'DICA: Pontuações_altas garantem mais_vidas!',
      en_US: "HINT: High scores_reward extra lives!"
    },
    gameoverHint5: { //glossary.text.gameoverHint5[language]
      pt_BR: 'DICA: A Cada 7 fases_o jogo fica mais_difícil, mas também_aumenta o bônus_ao fim da fase!',
      en_US: "HINT: Every 7 stages_game gets harder,_but also increases_round clear bonus!"
    },
    gameoverHint6: { //glossary.text.gameoverHint5[language]
      pt_BR: 'DICA: Piranhas não_atacam Snow depois_de coletar todos os_peixes necessários!',
      en_US: "HINT: Piranas don't_attack Snow after_all required fish_were collected!"
    },
    gameoverHint7: { //glossary.text.gameoverHint5[language]
      pt_BR: 'DICA: Um bom jogador_consegue completar_34 estágios em uma_partida!',
      en_US: "HINT: A good player_can clear 34 stages_in a match!"
    },
    wingame1: { //glossary.text.wingame1[language]
      pt_BR: "      PARABÉNS!__Foi uma boa partida!____________ Até o próximo jogo",
      en_US: "  CONGRATULATIONS!__It was a nice match!____________ See you next game!"
    },
    wingame2: { //glossary.text.wingame2[language]
      pt_BR: "      PARABÉNS!__Você zerou o placar_ de Snow & Yuki!!!______________ Até o próximo jogo",
      en_US: "  CONGRATULATIONS!__ You got max score_ at Snow & Yuki!!!______________ See you next game!"
    },
    gameover: { //glossary.text.gameover[language]
      pt_BR: "    FIM DE JOGO!",
      en_US: "     GAME OVER!"
    }
	},
	// ...
};