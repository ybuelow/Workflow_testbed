import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { first } from 'rxjs/internal/operators/first';
import { getSingleTestData, getMultipleData } from 'src/test/createGeoposTestData';

describe('SearchService', () => {
    let service: SearchService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(SearchService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get data with Didok as Parameter', async () => {
        service.getByDidiok(3003).subscribe((res) => {
            expect(res).toEqual(getSingleTestData());
        });
        const req = httpController.expectOne({
            method: 'GET',
            url: 'http://localhost:3001/entrys/didok/3003'
        });
        req.flush(getSingleTestData());
    });

    it('should get data with City parameter', async () => {
        const city = 'Bottighofen';
        service
            .getCertain(city)
            .pipe(first())
            .subscribe((res) => {
                expect(res).toEqual(getMultipleData().Payload);
            });

        const req = httpController.expectOne({
            method: 'GET',
            url: 'http://localhost:3001/entrys/Bottighofen'
        });
        req.flush(getMultipleData().Payload);
    });

    it('if the city does not exist it should return an empty []  ', async () => {
        const city = 'asdfadf';
        service.getCertain(city).subscribe((res) => {
            expect(res).toBeUndefined;
        });
    });
    it('if the didok does not exist it should return an empty []  ', async () => {
        const didok = 'asdfadf';
        service.getCertain(didok).subscribe((res) => {
            expect(res).toBeUndefined;
        });
    });
});
