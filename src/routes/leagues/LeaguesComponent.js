import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import LoadingComponent from 'components/loading';

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});


function LeaguesComponent() {
    const classes = useStyles();
    const [leagues, setLeagues] = useState(0);
    const [isBusy, setBusy] = useState(true)

    useEffect(() => {
        setBusy(true);
        const getUserById = async () => {
            const url = process.env.REACT_APP_SERVER_URL + "users/335a84d2-003a-4672-bbbd-491ed116159c"
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "access-control-allow-origin": "*",
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
            const data = await response.json();
            setLeagues(data);
            setBusy(false);
        }
        getUserById()
    }, []);

    if (isBusy) {
        return <LoadingComponent />
    }

    return (
        <Column>
            <Row alignSelf='stretch'>
                <Column flexGrow={1}>
                    <Row
                        className={classes.cardRow}
                        breakpoints={{ 384: 'column' }}
                    >
                        <span>Header</span>
                    </Row>
                </Column>
            </Row>
            {leagues && leagues.map ? leagues.map((league) => (
                <Row alignSelf='stretch'>
                    <Column flexGrow={1}>
                        <Row
                            className={classes.cardRow}
                            breakpoints={{ 384: 'column' }}
                        >
                            <CardComponent
                                title={league.name + " Season " + league.season}
                                link='View details'
                                subtitle='Commander:'
                                subtitleTwo={league.commander}
                                items={[
                                    <Row horizontal='space-between' vertical='center'>
                                        <span>Result: {league.result}</span>
                                        <span>Points Per Match: {league.pointspermatch}</span>
                                        <span>Moxfield URL: {league.url}</span>
                                    </Row>

                                ]}
                            />
                        </Row>
                    </Column>
                </Row>)) : null}
        </Column>
    );
}

export default LeaguesComponent;
