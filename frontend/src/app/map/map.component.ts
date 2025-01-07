import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { sbbICordinatesArray, SbbInformation } from '../modelData';
import { SearchService } from '../search.service';
import { take } from 'rxjs/internal/operators/take';
import { capitalizeFirstLetter } from './utils/capitalize';
import { FormBuilder, FormControl } from '@angular/forms';
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
    // Variabel Config
    public map: undefined | L.Map;
    public selectedCity = '';
    public didok = 0;
    public filteredData: Array<SbbInformation> = [];
    public cityCords: sbbICordinatesArray = [];
    public capitalize = capitalizeFirstLetter;
    public inputval = '';

    inportForm = this.fb.group({
        input: new FormControl('', { nonNullable: true })
    });
    constructor(
        private searchService: SearchService,
        public fb: FormBuilder
    ) {}

    ngAfterViewInit(): void {
        this.initializeMap();
        this.centerMap();
    }

    public initializeMap(): void {
        const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        this.map = L.map('map');
        L.tileLayer(baseMapURl).addTo(this.map);
    }
    public centerMap(): void {
        if (this.map !== undefined) {
            const bounds = L.latLngBounds(this.markers.map((marker) => marker.getLatLng()));
            this.map.fitBounds(bounds);
            this.map.setZoom(this.zoomMult);
        }
    }

    /**
     * Calls the function that returns all Points from a City as an observable and mark it on the map
     * @param city
     */
    public handleCity(city: string): void {
        if (city.length <= 0) {
            return;
        }
        this.searchService
            .getCertain(city)
            .pipe(take(1))
            .subscribe((daten) => {
                this.markCityOnMap(daten);
            });
    }

    /**
     * Function that calls a Http request and returns Data from one Station as an Observable and mark it on the map
     * @param didok
     */
    public handleDidok(didok: number): void {
        if (didok === 0) {
            return;
        }
        this.searchService
            .getByDidiok(didok)
            .pipe(take(1))
            .subscribe((daten) => {
                this.markDidokOnMap(daten);
            });
    }

    public submitFunc(): void {
        if (this.inportForm.value.input === null || this.inportForm.value.input === undefined) {
            ('error passing the calue from the form');
        } else {
            this.onSubmit(this.inportForm.value.input);
        }
    }
    /**
     *
     * @param cityOrDidok
     */
    public onSubmit(cityOrDidok: string): void {
        try {
            this.inputval = cityOrDidok;
            const elDiv = document.getElementById('isEmpty');
            const elCorr = document.getElementById('isCorrect');
            if (isNaN(parseInt(cityOrDidok, 0))) {
                elDiv?.classList.remove('shown');
                elDiv?.classList.add('hidden');
                elCorr?.classList.remove('shown');
                elCorr?.classList.add('hidden');
                const check1 = cityOrDidok;
                this.selectedCity = this.capitalize(check1);
                this.handleCity(this.selectedCity);
                return;
            }
            if (cityOrDidok.length === 0 || parseInt(cityOrDidok, 10) === 0) {
                elCorr?.classList.add('hidden');
                elCorr?.classList.remove('shown');
                elDiv?.classList.remove('hidden');
                elDiv?.classList.add('shown');
            } else {
                elCorr?.classList.remove('shown');
                elCorr?.classList.add('hidden');
                this.didok = parseInt(cityOrDidok, 10);
                this.handleDidok(this.didok);
            }
        } catch (err: unknown) {
            // eslint-disable-next-line no-console
            console.error('problem:', err);
        }
    }

    /**
     * fUNC To mark a Didok Stop on the leaflet map
     * @param didokData Array of Data for a Didok Stop in CH
     * @returns
     */
    private markDidokOnMap(didokData: SbbInformation[]): void {
        this.filteredData = didokData;
        if (this.filteredData.length <= 0 && didokData.length <= 0) {
            const elDiv = document.getElementById('isEmpty');
            const elCorr = document.getElementById('isCorrect');
            elDiv?.classList.add('hidden');
            elDiv?.classList.remove('shown');
            elCorr?.classList.remove('hidden');
            elCorr?.classList.add('shown');
            return;
        }
        this.cityCords = this.filteredData.map((data) => data.geopos);
        if (this.map !== undefined) {
            this.map.remove();
            this.initializeMap();
            for (let j = 0; j < this.filteredData.length; j++) {
                const markers = L.marker([this.cityCords[j].lat, this.cityCords[j].lon], {
                    icon: this.greenIcon
                });
                markers.bindPopup(this.filteredData[j].designationofficial);
                markers.addTo(this.map);
                const latlng = [markers.getLatLng()];
                const bound = L.latLngBounds(latlng);
                this.map.fitBounds(bound);
                this.map.setZoom(this.zoomForRes);
            }
        }
    }
    /**
     * Func to mark every stop for Bus and Train and Ship in a City on the leaflet Map
     * @param daten Array of Data for stops in a certain City
     * @returns
     */
    private markCityOnMap(daten: SbbInformation[]): void {
        this.filteredData = daten;
        if (this.filteredData.length <= 0 && daten.length <= 0) {
            const elCorr = document.getElementById('isCorrect');
            elCorr?.classList.remove('hidden');
            elCorr?.classList.add('shown');
            return;
        }
        this.cityCords = this.filteredData.map((data) => data.geopos);
        if (this.map !== undefined) {
            this.map.remove();
            this.initializeMap();
            for (let e = 0; e < this.filteredData.length; e++) {
                const markers = L.marker([this.cityCords[e].lat, this.cityCords[e].lon], {
                    icon: this.greenIcon
                });
                markers.bindPopup(this.filteredData[e].designationofficial);
                markers.addTo(this.map);
                const latlng = [markers.getLatLng()];
                const bound = L.latLngBounds(latlng);
                this.map.fitBounds(bound);
                this.map.setZoom(this.zoomForRes);
            }
        }
    }

    /**
     * -
     */
    protected greenIcon: L.Icon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    });
    protected markers: L.Marker[] = [L.marker([47.566666, 9.100001])];
    private zoomMult = 11;
    private zoomForRes = 14;
}
