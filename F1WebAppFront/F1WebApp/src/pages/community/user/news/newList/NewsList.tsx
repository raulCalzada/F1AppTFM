import React, { useEffect, useState } from "react";
import './NewsList.css';
import { useNavigate } from "react-router-dom";
import { CommunityMainContainer } from "../../../../../common/communityMainContainer/CommunityMainContainer";
import { useUser } from "../../../../../hooks/useUser";

export const NewsList: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    

    const [newsList, setNewsList] = useState([
    {
        id: 1,
        title: "Verstappen Extends Championship Lead",
        subtitle: "Red Bull dominates again in Spain",
        content: "Max Verstappen secured another convincing victory at the Spanish Grand Prix, further extending his championship lead. Red Bull’s strategy proved flawless, leaving rivals in the dust...",
        imageUrl1: "https://e00-us-marca.uecdn.es/assets/multimedia/imagenes/2022/05/22/16532302907541.jpg"
    },
    {
        id: 2,
        title: "Ferrari Introduces Major Upgrades",
        subtitle: "New sidepods and floor for upcoming races",
        content: "Ferrari has unveiled a significant upgrade package ahead of the Canadian Grand Prix. The team hopes the changes to their sidepod and floor design will improve aerodynamic efficiency...",
        imageUrl1: "https://i.pinimg.com/736x/f5/7a/cd/f57acd525c15fa16d7b23d29637847f6.jpg"
    },
    {
        id: 3,
        title: "McLaren Surprises with Strong Qualifying",
        subtitle: "Piastri and Norris in Top 5",
        content: "McLaren showed impressive pace during Saturday's qualifying session, with both Oscar Piastri and Lando Norris making it into the top five. The team credits setup changes and weather conditions...",
        imageUrl1: "https://e00-especiales-marca.uecdn.es/motor/images/formula1/seo/seo-especial2024-mclaren.jpg"
    },
    {
        id: 4,
        title: "Mercedes Admits Concept Errors",
        subtitle: "Toto Wolff opens up after disappointing weekend",
        content: "Following a poor performance at the Monaco GP, Mercedes team principal Toto Wolff acknowledged their car concept may have fundamental flaws. Discussions are ongoing about a potential redesign...",
        imageUrl1: "https://f1grandprix.motorionline.com/wp-content/uploads/2024/03/russell-mercedes-libere-australia-f1-2024-1024x683.jpg"
    }
]);
    const navigate = useNavigate();

    useEffect(() => {
            getLoggedUser();
        }, []);

    useEffect(() => {
            if (userStatusLog.error) {
                navigate("/community/login");
            }
            if (loggedUser?.role == 1) {
                navigate("/community/admin/menu");
            }
        }, [userStatusLog, loggedUser, navigate]);


    const handleClick = (id: number) => {
        navigate(`/community/news/${id}`);
    };

    if (!newsList.length) return <div>Loading...</div>;

    const [firstNews, ...restNews] = newsList;

    return (
        <CommunityMainContainer>
            <div className="news-list-container">
                <h2 className="news-list-title">Latest F1 News</h2>

                <div className="featured-news" onClick={() => handleClick(firstNews.id)}>
                    {firstNews.imageUrl1 && <img src={firstNews.imageUrl1} alt={firstNews.title} />}
                    <div className="featured-news-content">
                        <h3>{firstNews.title}</h3>
                        <p className="subtitle">{firstNews.subtitle}</p>
                        <p className="snippet">{firstNews.content.slice(0, 120)}...</p>
                    </div>
                </div>

                <div className="news-grid">
                    {restNews.map((news) => (
                        <div key={news.id} className="news-card" onClick={() => handleClick(news.id)}>
                            {news.imageUrl1 && <img src={news.imageUrl1} alt={news.title} />}
                            <div className="news-card-content">
                                <h4>{news.title}</h4>
                                <p>{news.subtitle}</p>
                                <p className="snippet">{news.content.slice(0, 60)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CommunityMainContainer>
    );
};
