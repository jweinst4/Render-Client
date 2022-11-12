import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
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
        const getDatas = async () => {
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
        getDatas()
    }, []);

    function displayLeagues() {
        return (
            leagues.map((user) => (
                <div key={user.commander}>
                    <p>{user.commander}</p>
                </div>
            ))
        )
    };

    if (isBusy) {
        console.log('is busy');
        return <LoadingComponent />
    }

    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                {leagues && leagues.map ? displayLeagues() : null}
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='test'
                        value='60'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Overdue'
                        value='16'
                    />
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Open'
                        value='43'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='On hold'
                        value='64'
                    />
                </Row>
            </Row>
            <div className={classes.todayTrends}>

            </div>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{ 1024: 'column' }}
            >

            </Row>
        </Column>
    );
}

export default LeaguesComponent;
