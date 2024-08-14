import HeadingDesign from "../general/HeaderDesign"

type Props = {
    title: string;
}

export const PathwayRoadmap = ({title}: Props) => {
    return (
        <section>
            <HeadingDesign heading={`${title} pathway roadmap`} />

            <div className="h-[754px]"></div>
        </section>
    )
}