import ATSScoreCard from "./ATSScoreCard";
import ScoreCards from "./ScoreCards";
import SkillsSection from "./SkillsSection";
import RecommendationsSection from "./RecommendationsSection";

const AnalysisResults = ({ analysis }) => {

    return (

        <div className="space-y-8">

            <ATSScoreCard
                finalScore={analysis.finalScore}
            />

            <ScoreCards
                semanticScore={analysis.semanticScore}
                skillScore={analysis.skillScore}
            />

            <SkillsSection
                analysis={analysis}
            />

            <RecommendationsSection
                recommendations={analysis.recommendations}
            />

        </div>
    );
};

export default AnalysisResults;