import React, { useLayoutEffect, useRef, useState, ReactNode, CSSProperties, } from 'react';
import { throttle } from '../../helpers/throttle';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

const DEFAULT_MAP_STATE = {
    lng: 37.5395,
    lat: 55.8066,
    zoom: 16.00,
};

export interface ISignUpProps {
    children: ReactNode,
}

const Map: React.FunctionComponent<ISignUpProps> = (props: ISignUpProps) => {
    const [ mapState, setMapState ] = useState(DEFAULT_MAP_STATE);

    const mapContainer: React.RefObject<HTMLDivElement> = useRef(null);

    useLayoutEffect(() => {
        if (!mapContainer.current) { return; }
        const map = new mapboxgl.Map({
            center: [ mapState.lng, mapState.lat ],
            zoom: mapState.zoom,
            container: mapContainer.current as HTMLElement,
            style: 'mapbox://styles/mapbox/streets-v9',
            accessToken: ACCESS_TOKEN,
        });

        const throttledMoveHandler = throttle(() => {
            setMapState({
                lng: +map.getCenter().lng.toFixed(4),
                lat: +map.getCenter().lat.toFixed(4),
                zoom: +map.getZoom().toFixed(2)
            });
        }, 100);

        map.on('moveend', throttledMoveHandler);
    });

    const style: CSSProperties = {
        position: 'absolute',
        top: '80px',
        bottom: 0,
        width: '100%'
    };

    return (
        <>
            {props.children}
            <div ref={ mapContainer } style={ style } />
        </>
    );
};

export default Map;
