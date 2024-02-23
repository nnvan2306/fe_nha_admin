export const RouterDTO = Object.freeze({
    home: "/*",
    auth: {
        manageAuth: "/auth/*",
        register: "/auth/register",
        login: "/auth/login",
    },
    season: {
        manageSeason: "/season/*",
        create: "/season/create",
        allSeason: "/season/all",
    },
    team: {
        manageTeam: "/team/*",
        create: "/team/create",
        allTeam: "/team/all",
        managePlayerOfTeam: "/team/managePlayer",
    },
    player: {
        managePlayer: "player/*",
        create: "/player/create",
        allPlayer: "/player/all",
    },
});
