import Banner from "./Banner";
import HeroOrnaments from "./HeroOrnaments";
import Statistik from "./Statistik";
import Highlight from "./Highlight";
import Tickets from "./Tickets";
import Schedules from "./Schedules";
import Rundown from "./Rundown";
import Events from "./Events";
import Galleries from "./Galleries";
import RunningText from '@/components/RunningText';

const HomeComponents = ({ type, data, festival }) => {
    switch (type) {
        case "banner":
            return <Banner data={data} festival={festival} />;
        case "hero-ornaments":
            return <HeroOrnaments />;
        case "statistik":
            return <Statistik data={data} festival={festival} />;
        case "highlight":
            return (
                <>
                    <RunningText />
                    <Highlight data={data} festival={festival} />
                </>
            );
        case "tickets":
            return (
                <>
                    <RunningText />
                    <Tickets data={data} festival={festival} />
                </>
            );
        case "schedules":
            return (
                <>
                    <RunningText />
                    <Schedules data={data} festival={festival} />
                </>
            );
        case "rundown":
            return (
                <>
                    <RunningText />
                    <Rundown data={data} festival={festival} />
                </>
            );
        case "events":
            return (
                <>
                    <RunningText />
                    <Events data={data} festival={festival} />
                </>
            );
        case "galleries":
            return (
                <>
                    <RunningText />
                    <Galleries data={data} festival={festival} />
                </>
            );
    }
}

export default HomeComponents;