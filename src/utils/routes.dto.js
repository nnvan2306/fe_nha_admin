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
        updateTeam: "/team/update",
        managePlayerOfTeam: "/team/managePlayer",
    },
    player: {
        managePlayer: "/player/*",
        create: "/player/create",
        allPlayer: "/player/all",
        updatePlayer: "/player/update",
    },
    statistical: {
        manageStatistical: "/statistical/*",
        create: "/statistical/create",
        allStatistical: "/statistical/allStatistical",
        update: "/statistical/update",
    },
    rating: {
        manageRating: "/rating/*",
        create: "/rating/createRating",
        allRating: "/rating/allRating",
        update: "/rating/updateRating",
    },
});
