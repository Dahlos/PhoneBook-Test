import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comuna, Persona, Region } from '../interfaces/interfaces';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // listas
  regions: Region[];
  auxRegions: Region[];
  personas: Persona[];
  auxPersonas: Persona[];
  comunas: Comuna[];
  auxComunas: Comuna[];
  //
  searchQuery: any;
  selectedRegion: Region;
  selectedComuna: Comuna;
  loading: boolean;
  constructor(public apiSertice: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadPersonas();
    this.loadRegiones();
  }

  /**
   *
   */
  loadRegiones() {
    this.apiSertice.getRegions().subscribe(
      (data: Region[]) => {
        this.regions = data;
        this.auxRegions = this.regions;
        this.comunas = this.regions[0].comunas;
      },
      (error) => {
        window.alert(
          'Ha ocurrido un error y no se ha podido cargar las regiones'
        );
        console.log(error);
      }
    );
  }

  /**
   *
   */
  loadPersonas() {
    this.apiSertice.getPersonas().subscribe(
      (data: Persona[]) => {
        this.personas = data.filter((persona) => {
          return persona.activo == 1;
        });
        this.auxPersonas = this.personas;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        window.alert(
          'Ha ocurrido un error y no se ha podido cargar los datos de las personas'
        );
      }
    );
  }

  /**
   *
   * @param query
   */
  onSearchByNameAndLastName(query) {
    if (query.length <= 0) this.resetSelects();
    this.personas = this.auxPersonas;
    if (query.length > 0) {
      let strFilter = query.toLowerCase().split(' ').join('');
      this.personas = this.personas.filter((persona: Persona) => {
        return (
          (
            persona.nombre.toLowerCase() + persona.apellido.toLowerCase()
          ).includes(strFilter) ||
          (
            persona.apellido.toLowerCase() + persona.nombre.toLowerCase()
          ).includes(strFilter)
        );
      });
    }
  }

  /**
   *
   */
  resetSelects() {
    this.selectedRegion = null;
    this.selectedRegion = null;
  }

  /**
   *
   * @param region_id
   */
  onChangeRegionSelected(region_id) {
    this.selectedComuna = undefined;
    this.filterComunasByRegion(region_id);
  }

  /**
   *
   * @param id_comuna
   */
  filterByDirection(id_comuna) {
    this.personas = this.personas.filter((persona: Persona) => {
      if (id_comuna) return persona.direccion.comuna.id == id_comuna;
      else
        return (
          this.comunas.find((comuna: Comuna) => {
            return persona.direccion.comuna.id == comuna.id;
          }) != undefined
        );
    });
  }

  /**
   *
   * @param data
   */
  onChangeComunaSelected(data) {
    this.comunas = this.auxComunas;
  }

  /**
   *
   * @param region_id
   */
  filterComunasByRegion(region_id: number) {
    this.regions = this.auxRegions;
    let currentRegion: Region = this.regions.find((region: Region) => {
      return region.id == region_id;
    });
    this.comunas = currentRegion.comunas;
    this.auxComunas = this.comunas;
  }

  /**
   * Lleva a la pagina de detalle de la persona
   * @param persona
   */
  onClickPersonaDetail(persona: Persona) {
    let navigationExtras: NavigationExtras = {
      state: {
        persona: persona,
      },
    };
    this.router.navigateByUrl(`/person`, navigationExtras);
  }

  /**
   *
   */
  resetFilter() {
    this.regions = this.auxRegions;
    this.personas = this.auxPersonas;
  }

  /**
   * Filtra las personas por los valores de los select de region y comuna
   */
  searchByDirection() {
    if (!this.selectedComuna && !this.selectedRegion) return;

    this.personas = this.auxPersonas;

    if (!this.searchQuery) {
      this.filterByDirection(this.selectedComuna);
    } else if (this.searchQuery.length > 0) {
      this.onSearchByNameAndLastName(this.searchQuery);
      this.filterByDirection(this.selectedComuna);
    }
  }
}
