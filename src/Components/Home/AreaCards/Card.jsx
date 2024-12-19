import React from 'react';
import PropTypes from 'prop-types';
import PieChartWithPaddingAngle from '../Recharts/PieChar';
const Card = ({ colors, percentFillvalue, cardinfo }) => {
    const { title, value, text } = cardinfo;
    return (
        //style={{ backgroundColor: colors[0], color: colors[1] }}
        <div className="bg-white flex items-center rounded-md p-5 px-4 justify-between shadow-md md:p-3">
            <div>
                <h5 className="info-title text-lg text-gray-800 font-bold mb-2">{title}</h5>
                <div className='info-value text-xl text-gray-900 font-extrabold mb-2'>{value}</div>
                <p className='info-text text-base text-gray-700 font-normal'>{text}</p>
            </div>
            <div>
                <PieChartWithPaddingAngle
                    percentFillvalue={percentFillvalue}
                    colors={colors}
                />
            </div>
        </div>
    );
};

Card.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    percentFillvalue: PropTypes.number.isRequired,
    cardinfo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;
