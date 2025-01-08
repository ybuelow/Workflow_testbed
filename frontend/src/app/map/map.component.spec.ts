import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapComponent } from './map.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
import { SearchMockService } from 'src/test/searchMock.service';

describe('MapComponentClass', () => {
    let component: MapComponent;
    let fixture: ComponentFixture<MapComponent>;
    let service: SearchService;
    let mock: SearchMockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MapComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            providers: [SearchService, SearchMockService]
        });
        service = TestBed.inject(SearchService);
        mock = TestBed.inject(SearchMockService);
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should check if functions have been called after ngAfterViewInit', () => {
        const spy1 = spyOn(component, 'initializeMap');
        const spy2 = spyOn(component, 'centerMap');
        const submitSpy = spyOn(component, 'submitFunc');
        component.ngAfterViewInit();
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(submitSpy).not.toHaveBeenCalled();
    });
    it('should check wether the app is initialised', () => {
        const div = document.querySelector(`[id="map"]`);
        expect(div).toBeDefined();
    });
    it('should check if the error elemnt 1 is hidden by default', () => {
        const elDiv = document.getElementById('isEmpty');
        expect(elDiv).toHaveClass('hidden');
    });
    it('should check if the error elemnt 2 is hidden by default', () => {
        const elDiv = document.getElementById('isCorrect');
        expect(elDiv).toHaveClass('hidden');
    });
    it('should check wether the form has a input element', () => {
        const labelEl = fixture.debugElement.query(By.css('input'));
        expect(labelEl).toBeTruthy();
    });
    it('should check wether the form has a button element', () => {
        const elButton = fixture.debugElement.query(By.css('button'));
        expect(elButton).toBeTruthy();
    });
    it('should call the submit form', () => {
        const elForm = fixture.debugElement.query(By.css('form'));
        const spy = spyOn(component, 'submitFunc');
        elForm.triggerEventHandler('ngSubmit', null);
        fixture.autoDetectChanges();
        expect(spy).toHaveBeenCalled();
    });
    it('should call the onSubmit after the submitFunc has been called', () => {
        const spy1 = spyOn(component, 'onSubmit');
        component.submitFunc();
        fixture.detectChanges();
        expect(spy1).toHaveBeenCalled();
    });
    it('should have set the parameter as inputVal after calling onSubmit', () => {
        component.onSubmit('3000');
        fixture.detectChanges();
        expect(component.inputval).toEqual('3000');
        component.onSubmit('Altnau');
        fixture.detectChanges();
        expect(component.inputval).toEqual('Altnau');
    });
    it('should call the handleCity func because the parameter is nan and not empty ', () => {
        const spy = spyOn(component, 'handleCity');
        component.onSubmit('altnau');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });
    it('should capitalize the city if not empty or a number', () => {
        const spy = spyOn(component, 'capitalize');
        const elDiv = document.getElementById('isEmpty');
        const elcorr = document.getElementById('isCorrect');
        const spy2 = spyOn(component, 'handleCity');
        component.onSubmit('altnau');
        fixture.detectChanges();
        expect(elDiv).toHaveClass('hidden');
        expect(elDiv).not.toHaveClass('shown');
        expect(elcorr).toHaveClass('hidden');
        expect(elcorr).not.toHaveClass('shown');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('altnau');
        expect(spy2).toHaveBeenCalled();
    });
    it('should have called handleDidok because the parameter is a number', () => {
        const spy = spyOn(component, 'handleDidok');
        const elDiv = document.getElementById('isEmpty');
        const spy2 = spyOn(component, 'handleCity');
        component.onSubmit('3000');
        expect(spy).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
        expect(elDiv).toHaveClass('hidden');
        expect(elDiv).not.toHaveClass('shown');
    });
    it('should not have called handleDidok  because the parameter is empty', () => {
        const spy = spyOn(component, 'handleDidok');
        const emptyDiv = document.getElementById('isEmpty');
        const spy2 = spyOn(component, 'handleCity');
        component.onSubmit('0');
        expect(emptyDiv).not.toHaveClass('hidden');
        expect(emptyDiv).toHaveClass('shown');
        expect(spy).not.toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
    });

    it('should call handleDidok function with a parameter and hide the erromsg', () => {
        const spy = spyOn(service, 'getByDidiok').and.callFake(mock.getMockDidiok);
        component.handleDidok(3000);
        const elcorr = document.getElementById('isCorrect');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(3000);
        expect(elcorr).toHaveClass('hidden');
        expect(elcorr).not.toHaveClass('shown');
    });
    it('should call handleCity function with a parameter  ', () => {
        const spy = spyOn(service, 'getCertain').and.callFake(mock.getCertainMock);
        component.handleCity('Bottighofen');
        const elcorr = document.getElementById('isCorrect');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('Bottighofen');
        expect(elcorr).not.toHaveClass('shown');
        expect(elcorr).toHaveClass('hidden');
        expect(component.cityCords).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should call handleCity with a wrong param ', () => {
        const spy = spyOn(service, 'getCertain').and.callFake(mock.getNoCity);
        component.handleCity('adf');
        const elcorr = document.getElementById('isCorrect');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('adf');
        expect(elcorr).not.toHaveClass('hidden');
        expect(elcorr).toHaveClass('shown');
    });
    it('should call handleDidok and getdidok but the number is not a Didok-number so it should show an error msg', () => {
        const spy = spyOn(service, 'getByDidiok').and.callFake(mock.getnoDidok);
        const elDiv = document.getElementById('isEmpty');
        const elCorr = document.getElementById('isCorrect');
        component.handleDidok(30303030);
        expect(elCorr).toHaveClass('shown');
        expect(elCorr).not.toHaveClass('hidden');
        expect(elDiv).toHaveClass('hidden');
        expect(elDiv).not.toHaveClass('shown');
        expect(spy).toHaveBeenCalledWith(30303030);
    });
});
