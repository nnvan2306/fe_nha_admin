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
        create: "/rating/create",
        allRating: "/rating/all",
        update: "/rating/update",
    },
    match: {
        manageMatch: "/match/*",
        create: "/match/create",
        allMatch: "/match/all",
        updateMatch: "/match/update",
    },
    stadium: {
        manageStadium: "/stadium/*",
        create: "/stadium/create",
        allStadium: "/stadium/all",
        update: "/stadium/update",
    },
    stand: {
        manageStand: "/stand/*",
        create: "/stand/create",
        allStand: "/stand/all",
        update: "/stand/update",
    },
    calendar: {
        manageCalendar: "/calendar/*",
        create: "/calendar/create",
        allCalendar: "/calendar/all",
        update: "/calendar/update",
    },
    bill: {
        manageBill: "/bill/*",
        create: "/bill/create",
        allBill: "/bill/all",
        Update: "/bill/update",
    },
});
