import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { PaginatedFilter } from 'src/app/core/models/Filters/PaginatedFilter';
import { PaginatedResult } from 'src/app/core/models/wrappers/PaginatedResult';
import { TableColumn } from 'src/app/core/shared/components/table/table-column';
import { DiscountRules } from '../../models/DiscountRules';
import { DiscountRulesParams } from '../../models/discoutRulesParams';
import { DiscountRulesService } from '../../services/discountRules.service';
import { DiscountRulesFormComponent } from './discount-rules-form/discount-rules-form.component';

@Component({
  selector: 'app-discount-roles',
  templateUrl: './discount-roles.component.html',
  styleUrls: ['./discount-roles.component.scss']
})
export class DiscountRolesComponent implements OnInit {
  discountRules: PaginatedResult<DiscountRules>;
  DiscountRulesColumns: TableColumn[];
  DiscountRulesParams = new DiscountRulesParams();
  searchString: string;

  constructor(
    public discountRuleservice: DiscountRulesService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.DiscountRulesParams.pageSize = 5;
    this.getdiscountRules();
    this.initColumns();
    
  }

  getdiscountRules(): void {
    
    this.discountRuleservice.getDiscountRules(this.DiscountRulesParams).subscribe((result) => {
      this.discountRules = result;
      console.log(result);
    });
  }

  initColumns(): void {
    this.DiscountRulesColumns = [
     // { name: 'Id', dataKey: 'id', isSortable: true, isShowable: true },
      { name: 'Role Name', dataKey: 'name', isSortable: true, isShowable: true },
      { name: 'Product Name', dataKey: 'productName', isSortable: true, isShowable: true },
      { name: 'Quantity', dataKey: 'quantity', isSortable: true, isShowable: true },
      { name: 'Discount Percentage %', dataKey: 'percentage', isSortable: true, isShowable: true },
      { name: 'Action', dataKey: 'action', position: 'right' },
    ];
  }

  pageChanged(event: PaginatedFilter): void {
    this.DiscountRulesParams.pageSize = event.pageNumber;
    this.DiscountRulesParams.pageSize = event.pageSize;
    this.getdiscountRules();
  }

  openForm(DiscountRules?: DiscountRules): void {
    const dialogRef = this.dialog.open(DiscountRulesFormComponent, {
      data: DiscountRules,
    });
    dialogRef.afterClosed().subscribe(() => {
        this.getdiscountRules();
    });
  }

  remove($event: string): void {
    this.discountRuleservice.deleteDiscountRules($event).subscribe(() => {
      this.getdiscountRules();
      this.toastr.info('DiscountRules Removed');
    });
  }

  sort($event: Sort): void {
    this.DiscountRulesParams.orderBy = $event.active + ' ' + $event.direction;
    console.log(this.DiscountRulesParams.orderBy);
    this.getdiscountRules();
  }

  filter($event: string): void {
    this.DiscountRulesParams.keyword = $event.trim().toLocaleLowerCase();
    this.DiscountRulesParams.pageNumber = 1;
    this.DiscountRulesParams.pageSize = 10;
    this.getdiscountRules();
  }

  reload(): void {
    this.DiscountRulesParams.keyword = '';
    this.DiscountRulesParams.pageNumber = 1;
    this.DiscountRulesParams.pageSize = 10;
    this.getdiscountRules();
  }

}
