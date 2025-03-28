'use strict';

Module.register("MMM-MyStandings",{
	// Default module config.
	defaults: {
		updateInterval: 4 * 60 * 60 * 1000, // every 4 hours
		rotateInterval: 1 * 60 * 1000, // every 1 minute
		initialLoadDelay: 10 * 1000, // 10 second initial load delay
		lang: config.language,
		sports: [
			{ league: "NBA", groups: ["Southeast"] },
			{ league: "MLB", groups: ["American League East"] },
			{ league: "NFL", groups: ["AFC North"] },
			{ league: "NHL", groups: ["Metropolitan Division"] },
			{ league: "MLS", groups: ["Western Conference"] },
			{ league: "NCAAF", groups: ["Mountain West Conference"] },
			{ league: "NCAAM", groups: ["Conference USA"] },
			{ league: "NCAAW", groups: ["Big East Conference"] },
			{ league: "NCAAF Rankings", groups: ["FCS Coaches Poll"] },
			{ league: "NCAAM Rankings", groups: ["Coaches Poll"] },
			{ league: "NCAAW Rankings", groups: ["AP Top 25"] }
		],
		nameStyle: "short", // "abbreviation", "full", or "short"
		showLogos: true,
		useLocalLogos: true, // true, then display logos from folder.  false, then display logos from the ESPN url
		showByDivision: true, // true, then display one division at a time.  false, display all divisions per sport
		fadeSpeed: 2000,
		rankingLength: 25,
		colored: true, // true, then display logos in color.  false, then display logos in grayscale
		uniqueID: ""
	},

	url: "http://site.web.api.espn.com/apis/v2/sports/",
	urlRanking: "https://site.api.espn.com/apis/site/v2/sports/",

	SOCCER_LEAGUE_PATHS: {
		//International Soccer
		"AFC_ASIAN_CUP": "soccer/afc.cup",
		"AFC_ASIAN_CUP_Q": "soccer/afc.cupq",
		"AFF_CUP": "soccer/aff.championship",
		"AFR_NATIONS_CUP": "soccer/caf.nations",
		"AFR_NATIONS_CUP_Q": "soccer/caf.nations_qual",
		"AFR_NATIONS_CHAMPIONSHIP": "soccer/caf.championship",
		"CONMEBOL_COPA_AMERICA": "soccer/conmebol.america",
		"FIFA_CLUB_WORLD_CUP": "soccer/fifa.cwc",
		"FIFA_CONFEDERATIONS_CUP": "soccer/fifa.confederations",
		"FIFA_MENS_OLYMPICS": "soccer/fifa.olympics",
		"FIFA_WOMENS_OLYMPICS": "soccer/fifa.w.olympics",
		"FIFA_WOMENS_WORLD_CUP": "soccer/fifa.wwc",
		"FIFA_WORLD_CUP": "soccer/fifa.world",
		"FIFA_WORLD_CUP_Q_AFC": "soccer/fifa.worldq.afc",
		"FIFA_WORLD_CUP_Q_CAF": "soccer/fifa.worldq.caf",
		"FIFA_WORLD_CUP_Q_CONCACAF": "soccer/fifa.worldq.concacaf",
		"FIFA_WORLD_CUP_Q_CONMEBOL": "soccer/fifa.worldq.conmebol",
		"FIFA_WORLD_CUP_Q_OFC": "soccer/fifa.worldq.ofc",
		"FIFA_WORLD_CUP_Q_UEFA": "soccer/fifa.worldq.uefa",
		"FIFA_WORLD_U17": "soccer/fifa.world.u17",
		"FIFA_WORLD_U20": "soccer/fifa.world.u20",
		"UEFA_CHAMPIONS": "soccer/uefa.champions",
		"UEFA_CONFERENCE_LEAGUE": "soccer/uefa.europa.conf",
		"UEFA_EUROPA": "soccer/uefa.europa",
		"UEFA_EUROPEAN_CHAMPIONSHIP": "soccer/uefa.euro",
		"UEFA_EUROPEAN_CHAMPIONSHIP_Q": "soccer/uefa.euroq",
		"UEFA_EUROPEAN_CHAMPIONSHIP_U19": "soccer/uefa.euro.u19",
		"UEFA_EUROPEAN_CHAMPIONSHIP_U21": "soccer/uefa.euro_u21",
		"UEFA_NATIONS": "soccer/uefa.nations",
		"SAFF_CHAMPIONSHIP": "soccer/afc.saff.championship",
		"WOMENS_EUROPEAN_CHAMPIONSHIP": "soccer/uefa.weuro",

		//UK / Ireland Soccer
		"ENG_CHAMPIONSHIP": "soccer/eng.2",
		"ENG_EFL": "soccer/eng.trophy",
		"ENG_LEAGUE_1": "soccer/eng.3",
		"ENG_LEAGUE_2": "soccer/eng.4",
		"ENG_NATIONAL": "soccer/eng.5",
		"ENG_PREMIERE_LEAGUE": "soccer/eng.1",
		"IRL_PREM": "soccer/irl.1",
		"NIR_PREM": "soccer/nir.1",
		"SCO_CIS": "soccer/sco.cis",
		"SCO_CHAMPIONSHIP": "soccer/sco.2",
		"SCO_LEAGUE_1": "soccer/sco.3",
		"SCO_LEAGUE_2": "soccer/sco.4",
		"SCO_PREM": "soccer/sco.1",
		"WAL_PREM": "soccer/wal.1",

		//European Soccer
		"AUT_BUNDESLIGA": "soccer/aut.1",
		"BEL_DIV_A": "soccer/bel.1",
		"DEN_SAS_LIGAEN": "soccer/den.1",
		"ESP_LALIGA": "soccer/esp.1",
		"ESP_SEGUNDA_DIV": "soccer/esp.2",
		"FRA_LIGUE_1": "soccer/fra.1",
		"FRA_LIGUE_2": "soccer/fra.2",
		"GER_2_BUNDESLIGA": "soccer/ger.2",
		"GER_BUNDESLIGA": "soccer/ger.1",
		"GRE_SUPER_LEAGUE": "soccer/gre.1",
		"ISR_PREMIER_LEAGUE": "soccer/isr.1",
		"ITA_SERIE_A": "soccer/ita.1",
		"ITA_SERIE_B": "soccer/ita.2",
		"MLT_PREMIER_LEAGUE": "soccer/mlt.1",
		"NED_EERSTE_DIVISIE": "soccer/ned.2",
		"NED_EREDIVISIE": "soccer/ned.1",
		"NOR_ELITESERIEN": "soccer/nor.1",
		"POR_LIGA": "soccer/por.1",
		"ROU_FIRST_DIV": "soccer/rou.1",
		"RUS_PREMIER_LEAGUE": "soccer/rus.1",
		"SUI_SUPER_LEAGUE": "soccer/sui.1",
		"SWE_ALLSVENSKANLIGA": "soccer/swe.1",
		"TUR_SUPER_LIG": "soccer/tur.1",

		//South American Soccer
		"ARG_COPA": "soccer/arg.copa",
		"ARG_NACIONAL_B": "soccer/arg.2",
		"ARG_PRIMERA_DIV_B": "soccer/arg.3",
		"ARG_PRIMERA_DIV_C": "soccer/arg.4",
		"ARG_PRIMERA_DIV_D": "soccer/arg.5",
		"ARG_SUPERLIGA": "soccer/arg.1",
		"BOL_LIGA_PRO": "soccer/bol.1",
		"BRA_CAMP_CARIOCA": "soccer/bra.camp.carioca",
		"BRA_CAMP_GAUCHO": "soccer/bra.camp.gaucho",
		"BRA_CAMP_MINEIRO": "soccer/bra.camp.mineiro",
		"BRA_CAMP_PAULISTA": "soccer/bra.camp.paulista",
		"BRA_SERIE_A": "soccer/bra.1",
		"BRA_SERIE_B": "soccer/bra.2",
		"BRA_SERIE_C": "soccer/bra.3",
		"CHI_PRIMERA_DIV": "soccer/chi.1",
		"COL_PRIMERA_A": "soccer/col.1",
		"COL_PRIMERA_B": "soccer/col.2",
		"CONMEBOL_COPA_LIBERTADORES": "soccer/conmebol.libertadores",
		"CONMEBOL_COPA_SUDAMERICANA": "soccer/conmebol.sudamericana",
		"ECU_PRIMERA_A": "soccer/ecu.1",
		"PAR_PRIMERA_DIV": "soccer/par.1",
		"PER_PRIMERA_PRO": "soccer/per.1",
		"URU_PRIMERA_DIV": "soccer/uru.1",
		"VEN_PRIMERA_PRO": "soccer/ven.1",

		//North American Soccer
		"CONCACAF_GOLD_CUP": "soccer/concacaf.gold",
		"CONCACAF_NATIONS_LEAGUE": "soccer/concacaf.nations.league",
		"CONCACAF_NATIONS_Q": "soccer/concacaf.nations.league_qual",
		"CONCACAF_WOMENS_CHAMPIONSHIP": "soccer/concacaf.womens.championship",
		"CRC_PRIMERA_DIV": "soccer/crc.1",
		"GUA_LIGA_NACIONAL": "soccer/gua.1",
		"HON_PRIMERA_DIV": "soccer/hon.1",
		"JAM_PREMIER_LEAGUE": "soccer/jam.1",
		"MEX_ASCENSO_MX": "soccer/mex.2",
		"MEX_COPA_MX": "soccer/mex.copa_mx",
		"MEX_LIGA_BANCOMER": "soccer/mex.1",
		"SLV_PRIMERA_DIV": "soccer/slv.1",
		"USA_MLS": "soccer/usa.1",
		"USA_NCAA_SL_M": "soccer/usa.ncaa.m.1",
		"USA_NCAA_SL_W": "soccer/usa.ncaa.w.1",
		"USA_NASL": "soccer/usa.nasl",
		"USA_NWSL": "soccer/usa.nwsl",
		"USA_OPEN": "soccer/usa.open",
		"USA_USL": "soccer/usa.usl.1",

		//Asian Soccer
		"AFC_CHAMPIONS": "soccer/afc.champions",
		"AUS_A_LEAGUE": "soccer/aus.1",
		"CHN_SUPER_LEAGUE": "soccer/chn.1",
		"IDN_SUPER_LEAGUE": "soccer/idn.1",
		"IND_I_LEAGUE": "soccer/ind.2",
		"IND_SUPER_LEAGUE": "soccer/ind.1",
		"JPN_J_LEAGUE": "soccer/jpn.1",
		"MYS_SUPER_LEAGUE": "soccer/mys.1",
		"SGP_PREMIER_LEAGUE": "soccer/sgp.1",
		"THA_PREMIER_LEAGUE": "soccer/tha.1",

		//African Soccer
		"CAF_CHAMPIONS": "soccer/caf.champions",
		"CAF_CONFED_CUP": "soccer/caf.confed",
		"GHA_PREMIERE_LEAGUE": "soccer/gha.1",
		"KEN_PREMIERE_LEAGUE": "soccer/ken.1",
		"NGA_PRO_LEAGUE": "soccer/nga.1",
		"RSA_FIRST_DIV": "soccer/rsa.2",
		"RSA_PREMIERSHIP": "soccer/rsa.1",
		"UGA_SUPER_LEAGUE": "soccer/uga.1",
		"ZAM_SUPER_LEAGUE": "soccer/zam.1",
		"ZIM_PREMIER_LEAGUE": "soccer/zim.1",

		//Rugby
		"Premiership Rugby": "rugby/267979",
		"Rugby World Cup": "rugby/164205",
		"Six Nations Rugby": "rugby/180659",
		"The Rugby Championship": "rugby/244293",
		"European Rugby Champions Cup": "rugby/271937",
		"United Rugby Championship": "rugby/270557",
		"Super Rugby Pacific": "rugby/242041",
		"Olympic Men's 7s Rugby": "rugby/282",
		"Olympic Women's Rugby Sevens": "rugby/283",
		"International Test Match Rugby": "rugby/289234",
		"URBA Top 12 Rugby": "rugby/289279",
		"Mitre 10 Cup Rugby": "rugby/270563"
	},

	// Module properties.
	standings: null,
	standingsInfo: [],
	standingsSportInfo: [],
	ctRotate: 0,
	ctDivision: 0,
	currentSport: null,
	currentDivision: null,
	ignoreDivision: false,
	isLoaded: false,
	hasMoreDivisions: false,
	localLogos: {},
	
	//Options for different sports
	nba_l1: ["National Basketball Association"],
	nba_l2: ["Western Conference","Eastern Conference"],
	mlb_l1: ["Major League Baseball"],
	mlb_l2: ["American League","National League"],
	nfl_l1: ["National Football League"],
	nfl_l2: ["American Football Conference","National Football Conference"],
	nhl_l1: ["National Hockey League"],
	nhl_l2: ["Western Conference","Eastern Conference"],

	// Start the module.
	start: function () {

		// Set a uniqueId for this instance
		this.defaults.uniqueID = JSON.stringify(this.config.sports);
		
		// Get initial API data
		this.getData(false);

		// Schedule the API data update.
		this.scheduleUpdate();

		// Schedule the first UI load
		var self = this;

		self.sendSocketNotification("MMM-MYSTANDINGS-GET-LOCAL-LOGOS", {instanceId: self.identifier});

		setTimeout(function() {
			self.rotateStandings();
		}, this.config.initialLoadDelay);

		// Schedule the UI load based on normal interval
		var self = this;
		setInterval(function() {
			self.rotateStandings();
		}, this.config.rotateInterval);
	},	

	// Define required styles.
	getStyles: function () {
		return ["MMM-MyStandings.css"];
	},
	
	// Select the template depending on the display type.
	getTemplate: function () {
		return "standings.njk";
	},

	// Add all the data to the template.
	getTemplateData: function () {
		return {
			config: this.config,
			standings: this.standings,
			currentSport: this.currentSport,
			currentDivision: this.currentDivision,
			ignoreDivision: this.ignoreDivision,
		}
	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setInterval(function() {
			self.getData(true);
		}, nextLoad);
	},

	getData: function (clearAll) {
		// When we want to refresh data from the API call
		if (clearAll === true) {
			this.standingsInfo = [];
			this.standingsSportInfo = [];
			this.isLoaded = false;
		}

		var sport;
		var sportUrl;
		var self = this;
		for (var i = 0; i < this.config.sports.length; i++) {
			var sportUrls = [];
			switch (this.config.sports[i].league) {
				case "MLB":
					if (this.config.sports[i].groups && this.mlb_l1.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "baseball/mlb/standings?level=1&sort=gamesbehind:asc,winpercent:desc");
					}
					if (this.config.sports[i].groups && this.mlb_l2.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "baseball/mlb/standings?level=2&sort=gamesbehind:asc,winpercent:desc");
					}
					// wild card: http://site.web.api.espn.com/apis/v2/sports/baseball/mlb/standings?view=wild-card&sort=gamesbehind:asc,winpercent:desc
					sportUrls.push(this.url + "baseball/mlb/standings?level=3&sort=gamesbehind:asc,winpercent:desc");
					break;
				case "NBA":
					if (this.config.sports[i].groups && this.nba_l1.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "basketball/nba/standings?level=1&sort=gamesbehind:asc,winpercent:desc");
					}
					if (this.config.sports[i].groups && this.nba_l2.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "basketball/nba/standings?level=2&sort=gamesbehind:asc,winpercent:desc");
					}
					sportUrls.push(this.url + "basketball/nba/standings?level=3&sort=gamesbehind:asc,winpercent:desc");
					break;
				case "NFL":
					if (this.config.sports[i].groups && this.nfl_l1.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "football/nfl/standings?level=1&sort=winpercent:desc,playoffseed:asc");
					}
					if (this.config.sports[i].groups && this.nfl_l2.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "football/nfl/standings?level=2&sort=winpercent:desc,playoffseed:asc");
					}
					// playoffs: http://site.web.api.espn.com/apis/v2/sports/football/nfl/standings?view=playoff
					sportUrls.push(this.url + "football/nfl/standings?level=3&sort=winpercent:desc,playoffseed:asc");
					break;
				case "NHL":
					if (this.config.sports[i].groups && this.nhl_l1.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "hockey/nhl/standings?level=1&sort=points:desc,winpercent:desc,playoffseed:asc");
					}
					if (this.config.sports[i].groups && this.nhl_l2.some(item => this.config.sports[i].groups.includes(item))) {
						sportUrls.push(this.url + "hockey/nhl/standings?level=2&sort=points:desc,winpercent:desc,playoffseed:asc");
					}
					//wild card http://site.web.api.espn.com/apis/v2/sports/hockey/nhl/standings?view=wild-card
					sportUrls.push(this.url + "hockey/nhl/standings?level=3&sort=points:desc,winpercent:desc,playoffseed:asc");
					break;
				case "MLS":
					sportUrls.push(this.url + "soccer/usa.1/standings?sort=rank:asc");
					break;
				case "NCAAF":
					sportUrls.push(this.url + "football/college-football/standings?group=80&level=3&sort=leaguewinpercent:desc,vsconf_wins:desc,vsconf_gamesbehind:asc,vsconf_playoffseed:asc,wins:desc,losses:desc,playoffseed:asc,alpha:asc");
					break;
				case "NCAAM":
					sportUrls.push(this.url + "basketball/mens-college-basketball/standings?group=50&sort=playoffseed:asc,vsconf_winpercent:desc,vsconf_wins:desc,vsconf_losses:asc,vsconf_gamesbehind:asc&includestats=playoffseed,vsconf,vsconf_gamesbehind,vsconf_winpercent,total,winpercent,home,road,streak,vsaprankedteams,vsusarankedteams");
					break;
				case "NCAAW":
					sportUrls.push(this.url + "basketball/womens-college-basketball/standings?group=50&sort=playoffseed:asc,vsconf_winpercent:desc,vsconf_wins:desc,vsconf_losses:asc,vsconf_gamesbehind:asc&includestats=playoffseed,vsconf,vsconf_gamesbehind,vsconf_winpercent,total,winpercent,home,road,streak,vsaprankedteams,vsusarankedteams");
					break;
				case "NCAAF Rankings":
					sportUrls.push(this.urlRanking + "football/college-football/rankings");
					break;
				case "NCAAM Rankings":
					sportUrls.push(this.urlRanking + "basketball/mens-college-basketball/rankings");
					break;
				case "NCAAW Rankings":
					sportUrls.push(this.urlRanking + "basketball/womens-college-basketball/rankings");
					break;
				default: //soccer & rugby
					sportUrls.push(this.url + this.SOCCER_LEAGUE_PATHS[this.config.sports[i].league] + "/standings?sort=rank:asc");
					break;
			}

			for (var j = 0; j < sportUrls.length; j++) {
				this.sendSocketNotification(
					"STANDINGS_RESULT-" + this.config.sports[i].league, 
					{
						url: sportUrls[j],
						uniqueID: this.defaults.uniqueID
					}
				);
			}
		}
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification.startsWith("STANDINGS_RESULT") && payload.uniqueID == this.defaults.uniqueID ) {
			var receivedLeague = notification.split("-")[1];
			for (var leagueIdx in this.config.sports) {
				if (this.config.sports[leagueIdx].league === receivedLeague && this.config.sports[leagueIdx].groups === undefined && payload.result.children.length > 1) {
					this.config.sports[leagueIdx].groups = []
					for (var childIdx in payload.result.children) {
						if (payload.result.children[childIdx].children !== undefined) {
							for (var child2Idx in payload.result.children[childIdx].children) {
								this.config.sports[leagueIdx].groups.push(payload.result.children[childIdx].children[child2Idx].name);
							}
						} else {
							this.config.sports[leagueIdx].groups.push(payload.result.children[childIdx].name);
						}
					}
				}
			}
		}
		if (notification.includes("Rankings") && payload.uniqueID == this.defaults.uniqueID) {
			var receivedLeague = notification.split("-")[1];
			this.standingsInfo.push(this.cleanupRankings(payload.result.rankings, receivedLeague));
			this.standingsSportInfo.push(receivedLeague);
		} else if (notification.startsWith("STANDINGS_RESULT") && payload.uniqueID == this.defaults.uniqueID) {
			var receivedLeague = notification.split("-")[1];
			if (payload.result.standings) {
				this.standingsInfo.push(this.cleanupData(payload.result, receivedLeague));
			} else {
				this.standingsInfo.push(this.cleanupData(payload.result.children, receivedLeague));
			}
			if (this.standingsInfo.at(-1).length === 0) {
				this.standingsInfo.pop();
			} else {
				this.standingsSportInfo.push(receivedLeague);
			}
		} else if (notification === "MMM-MYSTANDINGS-LOCAL-LOGO-LIST") {
			this.localLogos = payload.logos;
		}
	},

	// This function helps rotate through different configured sports and rotate through divisions if that is configured
	rotateStandings: function() {
		// If we do not have any data, do not try to load the UI
		if (this.standingsInfo === undefined || this.standingsInfo === null || this.standingsInfo.length === 0) {
			return;
		}

		// If we reached the end of the array, start over at 0
		if (this.ctRotate >= this.standingsInfo.length) {
			this.ctRotate = 0;
		}

		this.standings = this.standingsInfo[this.ctRotate];
		this.currentSport = this.standingsSportInfo[this.ctRotate];

		if (this.config.showByDivision) {
			// If we only have 1 sport and 1 division, load it once and then do not try re loading again.
			if (this.isLoaded === true && this.standingsInfo.length === 1 && this.ctDivision === 0 && this.hasMoreDivisions === false) {
				return;
			}

			var isLastDivisionInSport = false;
			this.ignoreDivision = false;

			// Determine if we have more divisions/groups for this sport
			if (this.standingsInfo[this.ctRotate].length > 0) {
				this.currentDivision = this.standingsInfo[this.ctRotate][this.ctDivision].name;

				if (this.ctDivision === this.standingsInfo[this.ctRotate].length - 1) {
					isLastDivisionInSport = true;
				}
				if (this.standingsInfo[this.ctRotate].length > 1) {
					this.hasMoreDivisions = true;
				}
			}

			this.updateDom(this.config.fadeSpeed);
			this.isLoaded = true;
			this.ctDivision = this.ctDivision + 1;

			// Reset the division and increment the rotate when we reach the last division in a sport
			if (isLastDivisionInSport) {
				this.ctDivision = 0;
				this.ctRotate = this.ctRotate + 1;
			}
		} else {
			// If we only have 1 sport, load it once and then do not try re loading again.
			if (this.isLoaded === true && this.standingsInfo.length === 1) {
				return;
			}

			this.updateDom(this.config.fadeSpeed);
			this.isLoaded = true;
			this.ctRotate = this.ctRotate + 1;
		}
	},

	// For sake of size of the arrays, let us remove items that we do not particularly care about
	cleanupData: function(standingsObject, sport) {
		var g,h,i,j;
		var formattedStandingsObject = [];
		var isSoccer = this.isSoccerLeague(sport);

		if (standingsObject.standings !== undefined) {
			formattedStandingsObject.push(standingsObject);
		} else {
			for (g = 0; g < standingsObject.length; g++) {
				if (standingsObject[g].standings === undefined) {
					//for league or conference data, extract out the division
					for (h = 0; h < standingsObject[g].children.length; h++) {
						formattedStandingsObject.push(standingsObject[g].children[h]);
					}
				} else if (standingsObject[g].standings !== undefined) {
					formattedStandingsObject.push(standingsObject[g]);
				}
			}
		}

		if (formattedStandingsObject.length === 0) {
			formattedStandingsObject = standingsObject;
		}

		//division
		for (h = 0; h < formattedStandingsObject.length; h++) {
			var hasMatch = false;

			// We only want to show divisions/groups that we have configured
			for (var leagueIdx in this.config.sports) {
				if (this.config.sports[leagueIdx].league === sport) {
					if (this.config.sports[leagueIdx].groups !== undefined && this.config.sports[leagueIdx].groups.includes(formattedStandingsObject[h].name)) {
						hasMatch = true;
					} else {
						// Soccer is the only sport where we do not really need to look for divisions/groups
						// We must have found a match for all other non-soccer sports
						// For soccer, if there is a group defined in the config, only do those divisions/groups
						if (isSoccer) {
							hasMatch = true;
						} else {
							formattedStandingsObject[h] = null; //remove the division from memory to save space
						}
					}
				}
			}

			// Check to see if we have standings entries
			if (hasMatch === false || formattedStandingsObject[h] === null || formattedStandingsObject[h].standings === undefined || formattedStandingsObject[h].standings.entries === undefined) {
				formattedStandingsObject[h] = null;
				continue;
			}

			//teams
			for (i = 0; i < formattedStandingsObject[h].standings.entries.length; i++) {
				if (this.config.useLocalLogos === true) {
					var team = formattedStandingsObject[h].standings.entries[i].team;
					var leagueForLogoPath = sport;
					if (leagueForLogoPath.startsWith('NCAA')) {
						leagueForLogoPath = 'NCAA';
					}
					if (this.localLogos[leagueForLogoPath]) {
						if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + ".svg") !== -1) { 
							team.logos[0].href = this.file("logos/" + leagueForLogoPath + "/" + team.abbreviation + ".svg");
						} 
						else if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + ".png") !== -1) {
							team.logos[0].href = this.file("logos/" + leagueForLogoPath + "/" + team.abbreviation + ".png");
						}
					}
				}

				var newStats = [];
				//records
				for (j = 0; j < formattedStandingsObject[h].standings.entries[i].stats.length; j++) {
					var newEntry = [];
					var entry = formattedStandingsObject[h].standings.entries[i].stats[j];

					if (sport === 'NHL')
					{
						if (newStats.length === 4) {
							break;
						}
						switch (entry.name) {
							case "wins":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "losses":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
							case "otLosses":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 3,
									value: newEntry
								});
								break;
							case "points":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 4,
									value: newEntry
								});
								break;
						}
					}
					else if (sport === 'MLB')
					{
						if (newStats.length === 3) {
							break;
						}
						switch (entry.name) {
							case "wins":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "losses":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
							case "gamesBehind":
								newEntry.name = entry.name;
								newEntry.value = entry.displayValue;
								newStats.push({
									key: 3,
									value: newEntry
								});
								break;
						}
					}
					else if (sport === 'NBA')
					{
						if (newStats.length === 3) {
							break;
						}
						switch (entry.name) {
							case "wins":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "losses":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
							case "gamesBehind":
								newEntry.name = entry.name;
								newEntry.value = entry.displayValue;
								newStats.push({
									key: 3,
									value: newEntry
								});
								break;
						}
					}
					else if (sport === 'NFL')
					{
						if (newStats.length === 3) {
							break;
						}
						switch (entry.name) {
							case "wins":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "losses":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
							case "ties":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 3,
									value: newEntry
								});
								break;
						}
					}
					else if (sport === 'MLS')
					{
						if (newStats.length === 4) {
							break;
						}
						switch (entry.name) {
							case "wins":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "ties":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
							case "losses":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 3,
									value: newEntry
								});
								break;
							case "points":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 4,
									value: newEntry
								});
								break;
						}
					}
					else if (sport === 'NCAAF')
					{
						if (newStats.length === 2) {
							break;
						}
						switch (entry.name) {
							case "vs. Conf.":
								newEntry.name = entry.displayName;
								newEntry.value = entry.displayValue;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "overall":
								newEntry.name = entry.displayName;
								newEntry.value = entry.displayValue;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
						}
					}
					else if (sport === 'NCAAM' || sport === 'NCAAW')
					{
						if (newStats.length === 2) {
							break;
						}
						switch (entry.name) {
							case "vs. Conf.":
								newEntry.name = entry.displayName;
								newEntry.value = entry.displayValue;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "overall":
								newEntry.name = entry.displayName;
								newEntry.value = entry.displayValue;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
						}
					}
					else if (sport.includes('Rugby'))
					{
						if (newStats.length === 4) {
							break;
						}
						switch (entry.name) {
							case "gamesWon":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "gamesDrawn":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
							case "gamesLost":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 3,
									value: newEntry
								});
								break;
							case "points":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 4,
									value: newEntry
								});
								break;
						}
					}
					else //soccer
					{
						if (newStats.length === 4) {
							break;
						}
						switch (entry.name) {
							case "wins":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 1,
									value: newEntry
								});
								break;
							case "ties":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 2,
									value: newEntry
								});
								break;
							case "losses":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 3,
									value: newEntry
								});
								break;
							case "points":
								newEntry.name = entry.name;
								newEntry.value = entry.value;
								newStats.push({
									key: 4,
									value: newEntry
								});
								break;
						}
					}
				}
				

				// Sort these to help display in the correct order
				function sortByKey(array, key) {
					return array.sort(function(a, b) {
						var x = a[key]; var y = b[key];
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					});
				}

				newStats = sortByKey(newStats, 'key');

				var finalValues = [];
				for (var key in newStats) {
					finalValues.push(newStats[key].value);
				}

				formattedStandingsObject[h].standings.entries[i].stats = finalValues;
			}
		}

		return formattedStandingsObject.filter(Boolean);
	},

	// For sake of size of the arrays, let us remove items that we do not particularly care about (NCAA Rankings version)
	cleanupRankings: function(formattedStandingsObject, sport) {
		var poll,teamNo;

		//Filter polls
		for (poll = 0; poll < formattedStandingsObject.length; poll++) {
			var hasMatch = false;

			// We only want to show divisions/groups that we have configured
			for (var league in this.config.sports) {
				if (this.config.sports[league].league === sport) {
					if (this.config.sports[league].groups !== undefined && this.config.sports[league].groups.includes(formattedStandingsObject[poll].name)) {
						hasMatch = true;
					} else {
						formattedStandingsObject[poll] = null;
					}
				}
			}

			// Check to see if we have standings entries
			if (hasMatch === false || formattedStandingsObject[poll] === null || formattedStandingsObject[poll].ranks === undefined) {
				formattedStandingsObject[poll] = null;
				continue;
			}

			//Use local logos
			for (teamNo = 0; teamNo < formattedStandingsObject[poll].ranks.length; teamNo++) {
				if (this.config.useLocalLogos === true) {
					var team = formattedStandingsObject[poll].ranks[teamNo].team;
					var leagueForLogoPath = sport;
					if (leagueForLogoPath.startsWith('NCAA')) {
						leagueForLogoPath = 'NCAA';
					}
					if (this.localLogos[leagueForLogoPath]) {
						if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + ".svg") !== -1) { 
							team.logos[0].href = this.file("logos/" + leagueForLogoPath + "/" + team.abbreviation + ".svg");
						} 
						else if (this.localLogos[leagueForLogoPath].indexOf(team.abbreviation + ".png") !== -1) {
							team.logos[0].href = this.file("logos/" + leagueForLogoPath + "/" + team.abbreviation + ".png");
						}
					}
				}
			}
		}

		return formattedStandingsObject.filter(Boolean);
	},

	// Returns true when the sport is not found in the config (means that it's from one of the long list of soccer leagues)
	isSoccerLeague: function(sportToCheck) {
		for (var sport in this.defaults.sports) {
			if (this.defaults.sports[sport].league === sportToCheck) {
				return false;
			}
		}

		return true;
	}
});
