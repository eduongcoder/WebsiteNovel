import Card from './Card';
function Cards() {
    return (
        // className="grid grid-cols-1   md:grid-cols-2 sm:grid-cols-3 gap-4 mt-2"
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-2 mx-6 ">
            <Card
                colors={['#e4e8ef', '#4e33de']}
                percentFillvalue={80}
                cardinfo={{
                    title: 'today sell',
                    value: '$120',
                    text: 'we have sold 123 item',
                }}
            />
            <Card
                colors={['#e4e8ef', '#4ce13f']}
                percentFillvalue={50}
                cardinfo={{
                    title: ' Today Revenue',
                    value: '$80',
                    text: 'Available to payout',
                }}
            />
            <Card
                colors={['#e4e8ef', '#f29a2e']}
                percentFillvalue={40}
                cardinfo={{
                    title: 'In Escrow',
                    value: '$70',
                    text: 'Available to payout',
                }}
            />
        </section>
    );
}

export default Cards;
