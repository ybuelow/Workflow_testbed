/**
 *
 */
export type sbbICordinatesArray = Geopos[];

/**
 *
 */
export interface SbbInformation {
    lod: string;
    geopos: Geopos;
    numbershort: number;
    uiccountrycode: number;
    sloid: string;
    number: number;
    validfrom: string;
    validto: string;
    designationofficial: string;
    designationlong: unknown;
    abbreviation: unknown;
    operatingpoint: string;
    operatingpointwithtimetable: string;
    stoppoint: string;
    stoppointtype: string;
    freightservicepoint: string;
    trafficpoint: string;
    borderpoint: string;
    hasgeolocation: string;
    isocountrycode: string;
    cantonname: string;
    cantonfsonumber: string;
    cantonabbreviation: string;
    districtname: string;
    districtfsonumber: string;
    municipalityname: string;
    fsonumber: string;
    localityname: string;
    operatingpointtype: unknown;
    operatingpointtechnicaltimetabletype: unknown;
    meansoftransport: string;
    categories: unknown;
    operatingpointtrafficpointtype: unknown;
    operatingpointroutenetwork: string;
    operatingpointkilometer: string;
    operatingpointkilometermasternumber: unknown;
    sortcodeofdestinationstation: unknown;
    businessorganisation: string;
    businessorganisationnumber: number;
    businessorganisationabbreviationde: string;
    businessorganisationabbreviationfr: string;
    businessorganisationdescriptionde: string;
    businessorganisationdescriptionfr: string;
    fotcomment: unknown;
    height: number;
    creationdate: string;
    editiondate: string;
}

/**
 createing a Interface for my GeoPositions
 */
export interface Geopos {
    lon: number;
    lat: number;
}
