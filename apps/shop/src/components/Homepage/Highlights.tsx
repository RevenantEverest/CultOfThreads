import HighlightItem from './HighlightItem';

function Highlights() {
    return(
        <div className="flex flex-col items-center md:items-start md:flex-row justify-center gap-10">
            <HighlightItem
                title="New Arrivals"
                subtitle={`Fresh from the Hook \n Discover our latest creepy-cute creations.`}
                to="/shop"
                imageSrc={""}
            />
            <HighlightItem
                title="Best Sellers"
                subtitle={`Fan Favorites \n Our most loved horrors you can’t resist.`}
                to="/shop"
                imageSrc={""}
            />
            <HighlightItem
                title="Events"
                subtitle={`Catch Us in the Wild \n See where we’ll haunt next.`}
                to="/events"
                imageSrc={""}
            />
        </div>
    );
};

export default Highlights;