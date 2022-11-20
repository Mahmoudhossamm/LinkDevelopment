import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { Orders } from '../../models/orders';
import { OrdersParams } from '../../models/ordersParams';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: PaginatedResult<Orders>;
  ordersColumns: TableColumn[];
  ordersParams = new OrdersParams();
  searchString: string;
  constructor(
    public orderservice: OrdersService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ordersParams.pageSize = 5;
    this.getorders();
    this.initColumns();
  }
  
  getorders(): void {
    this.orderservice.getOrders(this.ordersParams).subscribe((result) => {
      this.orders = result;
      console.log(result);
    });
  }

  initColumns(): void {
    this.ordersColumns = [
     // { name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'name', dataKey: 'name', isSortable: true, isShowable: true },
      { name: 'description', dataKey: 'description', isSortable: true, isShowable: true },
      { name: 'Product Name', dataKey: 'productName', isSortable: true, isShowable: true },
      { name: 'price', dataKey: 'price', isSortable: true, isShowable: true },
      { name: 'quantity', dataKey: 'quantity', isSortable: true, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

  pageChanged(event: PaginatedFilter): void {
    this.ordersParams.pageNumber = event.pageNumber;
    this.ordersParams.pageSize = event.pageSize;
    this.getorders();
  }

  // openForm(DiscountRules?: DiscountRules): void {
  //   const dialogRef = this.dialog.open(DiscountRulesFormComponent, {
  //     data: DiscountRules,
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //       this.getorders();
  //   });
  // }

  remove($event: string): void {
    this.orderservice.deleteOrders($event).subscribe(() => {
      this.getorders();
      this.toastr.info('Order Removed');
    });
  }

  sort($event: Sort): void {
    this.ordersParams.orderBy = $event.active + ' ' + $event.direction;
    console.log(this.ordersParams.orderBy);
    this.getorders();
  }

  filter($event: string): void {
    this.ordersParams.keyword = $event.trim().toLocaleLowerCase();
    this.ordersParams.pageNumber = 1;
    this.ordersParams.pageSize = 10;
    this.getorders();
  }

  reload(): void {
    this.ordersParams.keyword = '';
    this.ordersParams.pageNumber = 1;
    this.ordersParams.pageSize = 10;
    this.getorders();
  }

}
