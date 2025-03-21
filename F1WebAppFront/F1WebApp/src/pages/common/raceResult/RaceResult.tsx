import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import "./RaceResult.css";
import { useRace } from "../../../hooks/useRace";
import { useEffect } from "react";
import background from "../../../assets/end.png";

export const RaceResult: React.FC = () => {
    const { raceId, year } = useParams<{ raceId?: string; year?: string }>();

    const {
        getRace,
        race,
    } = useRace();

    useEffect(() => {
        getRace(year!, raceId!);
    }, []);


    return (
        <div className="page" style={{ backgroundImage: `url(${background})` }}>
            <h1 style={{ color: "red" }}>Race Results</h1>
            <h2>Race Round {raceId}</h2>
            <h2>Year: {year}</h2>
            <div className="box-container">
                {race?.Results.map((result) => (
                    <Box
                        key={result.position}
                        className="box"
                        minHeight="auto"
                        my={0}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p={0}
                        sx={{
                            border: '15px solid white',
                            borderBottom: 'none',
                            textAlign: 'center'
                        }}
                    >
                        <h1 style={{ fontWeight: 'bold' }}>{result.position}</h1>
                        <div className="lineGrid"></div>
                        <h1 style={{ fontWeight: 'bold', border: '2px solid white', }}>{result.Driver.givenName} {result.Driver.familyName}</h1>
                        <h2>{result.number}</h2>
                        <p>Nationality: {result.Driver.nationality}</p>
                        <p style={{ color: 'red' }}>{result.Time?.time ? result.Time.time : '1 lap or more'}</p>
                        <h2>{result.Constructor.name} ({result.Constructor.nationality})</h2>
                    </Box>
                ))}
            </div>
        </div>
    );
};
