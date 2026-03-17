import JudgeImage from "./JudgeImage";

const Judges = ({data}) => {
    return (
        <div className="judges">
            {data.map((judge, index) => (
                <div className="judge-item" key={index}>
                    <JudgeImage image={judge.image} />
                    <div className="judge-content">
                        <div className="judge-content-header">
                            <div className="judge-label">{judge.label}</div>
                            <div className="judge-name">{judge.name}</div>
                            {judge.role && <div className="judge-role">{judge.role}</div>}
                        </div>
                        <hr />
                        <div className="judge-content-body" dangerouslySetInnerHTML={{ __html: judge.description }} />
                    </div>
                </div>
                        
            ))}
        </div>
    );
}

export default Judges;