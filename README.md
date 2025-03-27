# MMM-MyStandings
MagicMirror module to get ESPN standings for the major US sports.  This is a fork of the original MMM-MyStandings from user vincep5.  It has been updated with the ability to display multiple modules simultaneously and to patch some vulnerabilities.

vincep5 was inspired by MMM-MyScoreboard and figured that this will complement it nicely.
The module will rotate through different sports.  If you only want to show one sport or one division, the module will just display one without rotating.

## Preview
![screenshot1](screenshot1.JPG)

## Installing the module
```bash
cd ~/MagicMirror/modules
git clone https://github.com/dathbe/MMM-MyStandings
cd MMM-MyStandings
npm install
```

## Updating the module
```bash
cd ~/MagicMirror/modules/MMM-MyStandings
git pull
npm install
```

## Config
Add `MMM-MyStandings` module to the `modules` array in the `config/config.js` file.
````javascript
modules: [
{
	module: "MMM-MyStandings",
	position: "top_right",
	config: {
		sports: [
			{ league: "NBA", groups: ["Atlantic", "Central", "Southeast", "Northwest", "Pacific",
							"Southwest", "Western Conference", "Eastern Conference",
							"National Basketball Association"] },
			{ league: "MLB", groups: ["American League East", "American League Central",
							"American League West", "National League East",
							"National League Central", "National League West",
							"American League", "National League",
							"Major League Baseball"] },
			{ league: "NFL", groups: ["AFC East", "AFC North", "AFC South", "AFC West", "NFC East",
							"NFC North", "NFC South", "NFC West",
							"American Football Conference", "National Football Conference",
							"National Football League"] },
			{ league: "NHL", groups: ["Atlantic Division", "Metropolitan Division", "Central Division",
							"Pacific Division", "Western Conference", "Eastern Conference",
							"National Hockey League"] },
			{ league: "MLS", groups: ["Eastern Conference", "Western Conference"] },
			{ league: "NCAAF", groups: ["American Athletic Conference", "Atlantic Coast Conference",
							"Big 12 Conference", "Big Ten Conference", "Conference USA",
							"FBS Independents", "Mid-American Conference",
							"Mountain West Conference", "Pac-12 Conference",
							"Southeastern Conference", "Sun Belt - East",
							"Sun Belt - West"] },
			{ league: "NCAAM", groups: ["America East Conference", "American Athletic Conference",
							"Atlantic 10 Conference", "Atlantic Coast Conference",
							"ASUN Conference", "Big 12 Conference", "Big East Conference",
							"Big Sky Conference", "Big South Conference",
							"Big Ten Conference", "Big West Conference",
							"Colonial Athletic Association", "Conference USA",
							"Horizon League", "Ivy League",
							"Metro Atlantic Athletic Conference", "Mid-American Conference",
							"Mid-Eastern Athletic Conference",
							"Missouri Valley Conference", "Mountain West Conference",
							"Northeast Conference", "Ohio Valley Conference", "Patriot League",
							"Southeastern Conference", "Southern Conference",
							"Southland Conference", "Southwestern Athletic Conference",
							"Summit League", "Sun Belt Conference", "West Coast Conference",
							"Western Athletic Conference"] },
			{ league: "NCAAW", groups: ["ASUN Conference", "America East Conference",
							"American Athletic Conference", "Atlantic 10 Conference",
							"Atlantic Coast Conference", "Big 12 Conference",
							"Big East Conference", "Big Sky Conference", "Big South Conference",
							"Big Ten Conference", "Big West Conference",
							"Colonial Athletic Association", "Conference USA", "Horizon League",
							"Ivy League", "Metro Atlantic Athletic Conference",
							"Mid-American Conference", "Mid-Eastern Athletic Conference",
							"Missouri Valley Conference", "Mountain West Conference",
							"Northeast Conference", "Ohio Valley Conference", "Patriot League",
							"Southeastern Conference", "Southern Conference",
							"Southland Conference", "Southwestern Athletic Conference",
							"Summit League", "Sun Belt Conference", "West Coast Conference",
							"Western Athletic Conference"] },
			{ league: "NCAAF Rankings", groups: ["AP Top 25", "AFCA Coaches Poll", "FCS Coaches Poll",
							"AFCA Division II Coaches Poll", "AFCA Division III Coaches Poll"] },
			{ league: "NCAAM Rankings", groups: ["AP Top 25", "Coaches Poll"] },
			{ league: "NCAAW Rankings", groups: ["AP Top 25", "Coaches Poll"] }
		],
	}
}
]
````

Select the groups you want to rotate through or no groups to rotate through all groups in the league:

`{ league: "ENG_PREMIERE_LEAGUE" }` will display English Premier League overall standings (because there are no divisions/groups)
<br>`{ league: "MLB" }` will rotate through all MLB divisions
<br>`{ league: "NFL", groups: ["AFC East", "AFC North"] }` will rotate between AFC East and AFC North
<br>`{ league: "NBA", groups: ["Atlantic"] }` will display only the Atlantic Division

| Option | Description
| ------- |  -------
| updateInterval | Time in milliseconds to update data from ESPN<br><br>**Type:** `int` <br> **Default value:** `60 * 60 * 1000` (every 60 minutes)
| rotateInterval | Time in milliseconds to rotate through the leagues or divisions<br><br>**Type:** `int` <br> **Default value:** `1 * 60 * 1000` (every 1 minute)
| nameStyle | Display abbreviation, full name, or short name for the team<br><br>**Type:** `string` Options: "abbreviation", "full", or "short"<br> **Default value:** `short`
| showLogos | Display logos (true) or not (false)<br><br>**Type:** `boolean` <br> **Default value:** `true`
| useLocalLogos | Display logos from folder if they are available (true) or displays all logos from the ESPN url (false)<br><br>**Type:** `boolean` <br> **Default value:** `true`
| colored | Chooses whether to display the module in full color (true) or grayscale (false)<br><br>**Type:** `boolean` <br> **Default value:** `true`
| showByDivision | Rotate through each division/group separately (true) or show all divisions/groups at once stacked on top of one another (false)<br><br>**Type:** `boolean` <br> **Default value:** `true`
| fadeSpeed | Time in milliseconds to display the module<br><br>**Type:** `int` <br> **Default value:** `2000` (2 seconds)
| rankingLength | The number of teams to display when using `NCAAF Rankings` or `NCAAM Rankings`<br><br>**Type:** `int` <br> **Default value:** `25` (all rankings)


## Soccer Leagues
<details>
  <summary><b>Available Soccer Leagues</b> (click to expand)</summary>
	
	//International Soccer
	"AFC_ASIAN_CUP"
	"AFC_ASIAN_CUP_Q"
	"AFF_CUP"
	"AFR_NATIONS_CUP"
	"AFR_NATIONS_CUP_Q"
	"AFR_NATIONS_CHAMPIONSHIP"
	"CONMEBOL_COPA_AMERICA"
	"FIFA_CLUB_WORLD_CUP"
	"FIFA_CONFEDERATIONS_CUP"
	"FIFA_MENS_OLYMPICS"
	"FIFA_WOMENS_OLYMPICS"
	"FIFA_WOMENS_WORLD_CUP"
	"FIFA_WORLD_CUP"
	"FIFA_WORLD_CUP_Q_AFC"
	"FIFA_WORLD_CUP_Q_CAF"
	"FIFA_WORLD_CUP_Q_CONCACAF"
	"FIFA_WORLD_CUP_Q_CONMEBOL"
	"FIFA_WORLD_CUP_Q_OFC"
	"FIFA_WORLD_CUP_Q_UEFA"
	"FIFA_WORLD_U17"
	"FIFA_WORLD_U20"
	"UEFA_CHAMPIONS"
	"UEFA_CONFERENCE_LEAGUE"
	"UEFA_EUROPA"
	"UEFA_EUROPEAN_CHAMPIONSHIP"
	"UEFA_EUROPEAN_CHAMPIONSHIP_Q"
	"UEFA_EUROPEAN_CHAMPIONSHIP_U19"
	"UEFA_EUROPEAN_CHAMPIONSHIP_U21"
	"UEFA_NATIONS"
	"SAFF_CHAMPIONSHIP"
	"WOMENS_EUROPEAN_CHAMPIONSHIP"
	
	//UK/Ireland Soccer
	"ENG_CHAMPIONSHIP"
	"ENG_EFL"
	"ENG_LEAGUE_1"
	"ENG_LEAGUE_2"
	"ENG_NATIONAL"
	"ENG_PREMIERE_LEAGUE"
	"IRL_PREM"
	"NIR_PREM"
	"SCO_CIS"
	"SCO_CHAMPIONSHIP"
	"SCO_LEAGUE_1"
	"SCO_LEAGUE_2"
	"SCO_PREM"
	"WAL_PREM"
	
	//European Soccer
	"AUT_BUNDESLIGA"
	"BEL_DIV_A"
	"DEN_SAS_LIGAEN"
	"ESP_LALIGA"
	"ESP_SEGUNDA_DIV"
	"FRA_LIGUE_1"
	"FRA_LIGUE_2"
	"GER_2_BUNDESLIGA"
	"GER_BUNDESLIGA"
	"GRE_SUPER_LEAGUE"
	"ISR_PREMIER_LEAGUE"
	"ITA_SERIE_A"
	"ITA_SERIE_B"
	"MLT_PREMIER_LEAGUE"
	"NED_EERSTE_DIVISIE"
	"NED_EREDIVISIE"
	"NOR_ELITESERIEN"
	"POR_LIGA"
	"ROU_FIRST_DIV"
	"RUS_PREMIER_LEAGUE"
	"SUI_SUPER_LEAGUE"
	"SWE_ALLSVENSKANLIGA"
	"TUR_SUPER_LIG"
	
	//South American Soccer
	"ARG_COPA"
	"ARG_NACIONAL_B"
	"ARG_PRIMERA_DIV_B"
	"ARG_PRIMERA_DIV_C"
	"ARG_PRIMERA_DIV_D"
	"ARG_SUPERLIGA"
	"BOL_LIGA_PRO"
	"BRA_CAMP_CARIOCA"
	"BRA_CAMP_GAUCHO"
	"BRA_CAMP_MINEIRO"
	"BRA_CAMP_PAULISTA"
	"BRA_SERIE_A"
	"BRA_SERIE_B"
	"BRA_SERIE_C"
	"CHI_PRIMERA_DIV"
	"COL_PRIMERA_A"
	"COL_PRIMERA_B"
	"CONMEBOL_COPA_LIBERTADORES"
	"CONMEBOL_COPA_SUDAMERICANA"
	"ECU_PRIMERA_A"
	"PAR_PRIMERA_DIV"
	"PER_PRIMERA_PRO"
	"URU_PRIMERA_DIV"
	"VEN_PRIMERA_PRO"
	
	//North American Soccer
 	"CONCACAF_GOLD_CUP"
 	"CONCACAF_NATIONS_LEAGUE"
	"CONCACAF_NATIONS_Q"
	"CONCACAF_WOMENS_CHAMPIONSHIP"
	"CRC_PRIMERA_DIV"
	"GUA_LIGA_NACIONAL"
	"HON_PRIMERA_DIV"
	"JAM_PREMIER_LEAGUE"
	"MEX_ASCENSO_MX"
	"MEX_COPA_MX"
	"MEX_LIGA_BANCOMER"
	"SLV_PRIMERA_DIV"
	"USA_MLS"
	"USA_NCAA_SL_M"
	"USA_NCAA_SL_W"
	"USA_NASL"
	"USA_NWSL"
	"USA_OPEN"
	"USA_USL"
	
	//Asian Soccer
	"AFC_CHAMPIONS"
	"AUS_A_LEAGUE"
	"CHN_SUPER_LEAGUE"
	"IDN_SUPER_LEAGUE"
	"IND_I_LEAGUE"
	"IND_SUPER_LEAGUE"
	"JPN_J_LEAGUE"
	"MYS_SUPER_LEAGUE"
	"SGP_PREMIER_LEAGUE"
	"THA_PREMIER_LEAGUE"
	
	//African Soccer
	"CAF_CHAMPIONS"
	"CAF_CONFED_CUP"
	"GHA_PREMIERE_LEAGUE"
	"KEN_PREMIERE_LEAGUE"
	"NGA_PRO_LEAGUE"
	"RSA_FIRST_DIV"
	"RSA_PREMIERSHIP"
	"UGA_SUPER_LEAGUE"
	"ZAM_SUPER_LEAGUE"
	"ZIM_PREMIER_LEAGUE"
</details>

If your soccer competition has groups and you want to see groups rotate, consider this as your config
````javascript
{ league: "FIFA_WORLD_CUP", groups: ["Group A"] }, //only show group A
{ league: "FIFA_WORLD_CUP", groups: ["Group A", "Group B", "Group C", "Group D", "Group E", "Group G", "Group H"] } //rotates through selected groups
{ league: "FIFA_WORLD_CUP" } //rotates through all groups or displays overall standings if there are no groups
````
## Rugby Leagues
<details>
  <summary><b>Available Rugby Leagues</b> (click to expand)</summary>
	
	//Rugby
	"Premiership Rugby"
	"Rugby World Cup"
	"Six Nations Rugby"
	"The Rugby Championship"
	"European Rugby Champions Cup"
	"United Rugby Championship"
	"Super Rugby Pacific"
	"Olympic Men's 7s Rugby"
	"Olympic Women's Rugby Sevens"
	"International Test Match Rugby"
	"URBA Top 12 Rugby"
	"Mitre 10 Cup Rugby"
</details>

Rugby leagues work similarly to soccer leagues.

# Thank You
Special thank you to [vincep5](https://github.com/vincep5/), who created the original version of this module and did most of the work.
