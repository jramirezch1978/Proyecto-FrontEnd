import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadService } from '../../services/unidad.service';
import { UnidadDTO } from '../../dto/UnidadDTO';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {
  displayedColumns: string[] = ['idCodUnidad', 'nombre', 'sigla', 'flagEstado', 'acciones'];
  dataSource: MatTableDataSource<UnidadDTO>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private unidadService: UnidadService) {
    this.dataSource = new MatTableDataSource<UnidadDTO>([]);
  }

  ngOnInit(): void {
    this.cargarUnidades();
  }

  cargarUnidades(): void {
    this.unidadService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error al cargar unidades:', error);
      }
    });
    
  }

  editarUnidad(unidad: UnidadDTO): void {
    // Implementar lógica de edición
  }

  eliminarUnidad(id: number): void {
    if (confirm('¿Está seguro de eliminar esta unidad?')) {
      this.unidadService.delete(id).subscribe(
        {
          next: () => {
            this.cargarUnidades();
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
          }
        }
      );
    }
    //Otras Lineas de codigo
  }

  activarUnidad(unidad: UnidadDTO): void {
    this.unidadService.activar(unidad).subscribe(
      {
        next: () => {
          this.cargarUnidades();
        },
        error: (error) => {
          console.error('Error al activar:', error);
        }
      }
    );
  }

  desactivarUnidad(unidad: UnidadDTO): void {
    this.unidadService.desactivar(unidad).subscribe({
      next: () => {
        this.cargarUnidades();
      },
      error: (error) => {
        console.error('Error al desactivar:', error);
      }
    });
  }
}