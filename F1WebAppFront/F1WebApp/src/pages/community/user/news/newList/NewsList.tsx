import React, { useEffect, useState } from "react";
import './NewsList.css';
import { useNavigate } from "react-router-dom";
import { CommunityMainContainer } from "../../../../../common/communityMainContainer/CommunityMainContainer";
import { useUser } from "../../../../../hooks/useUser";
import { useNews } from "../../../../../hooks/useNews";

export const NewsList: React.FC = () => {
    const { getLoggedUser, userStatusLog, loggedUser } = useUser();
    const { getNewsList, newsList} = useNews();

    const navigate = useNavigate();

    useEffect(() => {
            getLoggedUser();
            getNewsList();
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
