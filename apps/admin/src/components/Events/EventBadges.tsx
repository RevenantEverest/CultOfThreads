interface EventBadgesProps {
    isPast?: boolean,
    isToday?: boolean
};

const getBadgeInfo = (isPast?: boolean, isToday?: boolean): { background: string, title: string } => {

    if(isPast) {
        return {
            title: "Previous",
            background: "bg-red-950"
        };
    }

    if(isToday) {
        return {
            title: "Today",
            background: "bg-green-600"
        };
    }

    return { title: "Upcoming", background: "bg-purple-600" };
};

function EventBadges({ isPast, isToday }: EventBadgesProps) {

    const badgeInfo = getBadgeInfo(isPast, isToday);

    return(
        <div className={`text-sm font-bold px-4 rounded-full text-white ${badgeInfo.background}`}>
            {badgeInfo.title}
        </div>
    );
};

export default EventBadges;