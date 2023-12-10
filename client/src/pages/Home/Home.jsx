import {Component, Fragment, useEffect, useState} from "react";
import "../Home/Home.css"
import {getTokenFromCookie, saveTokenToCookie} from "../../cookies/cookies";

function Home() {
    const [timeZone, setTimeZone] = useState("");
    const [date, setDate] = useState("");
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetch data');
            try {
                let url = new URL(window.location.href);
                var token = url.searchParams.get("token");
                if (token) {
                    console.log(`qwerty: ${token}`);
                    console.log(getTokenFromCookie("TOKEN"));
                    saveTokenToCookie( token, {
                        path: "/",
                    });
                    console.log(getTokenFromCookie("TOKEN"));
                    setTimeout(() => {
                        console.log(`Token after delay: ${getTokenFromCookie("TOKEN")}`);
                    }, 1000);
                    window.location.href = '/';
                }
                const response = await fetch('http://ip-api.com/json/');
                let data = await (await response).json()
                console.log(data);
                setTimeZone(data['timezone']);
                let currentDate = new Date();
                let localString = new Intl.DateTimeFormat('ru-RU', {timeZone: data['timezone']}).format(currentDate);
                setDate(localString);

                const quoteResponse = await fetch('https://api.quotable.io/random');
                let quoteData = await quoteResponse.json();
                setQuote(quoteData['content']);
                setAuthor(quoteData['author'])
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <Fragment>
            <div className="home-wrapper">
                <h1>Welcome to Fit-tastic center!</h1>

                <img className="logo-image"
                     src={'https://media.istockphoto.com/id/1497018234/photo/strong-and-healthy-people-working-out.jpg?s=612x612&w=0&k=20&c=-H7Q3f5ZbfQLkSrH7CFck5bEkI15y1Jp2D7VKKTXtlM='}
                     alt="logo"/>
                <h3>Inspirational quote:</h3>
                <h4 className="quote"><q>{quote}</q><small> © {author}</small></h4>

                <h4>Your timezone: {timeZone}, date: {date}</h4>
            </div>
        </Fragment>

    );
}

export default Home