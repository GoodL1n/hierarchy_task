import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { NodeWithMap } from 'src/app/models/tree/node-map.model';
import { Node } from 'src/app/models/tree/node.model';
import { TreeNode } from 'src/app/models/tree/tree-node.model';
import { HierarchyService } from 'src/app/services/hierarchy.service';
import { ImportNotificationService } from 'src/app/services/import-notification.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnDestroy {

  @Input() isImport: boolean = true;

  subscriptionNewImport!: Subscription
  subscriptionDeleteCitizens!: Subscription

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      city_id: node.city_id,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<TreeNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private hierarchyService: HierarchyService,
    private notification: ImportNotificationService) {
  }

  ngOnInit() {
    this.subscriptionNewImport = this.notification.getInfoAboutSuccessImport().subscribe(notification => {
      this.updateTree()
    })

    this.subscriptionDeleteCitizens = this.notification.getInfoAboutDeleteCitizens().subscribe(data => {
      this.dataSource.data = []
    })

    this.updateTree()
  }

  updateTree(){
    this.hierarchyService.getHierarchyOfCitizens().subscribe(tree => {
      this.dataSource.data = tree.children!
    })
  }

  hasChild = (_: number, node: TreeNode) => node.expandable;

  ngOnDestroy(): void {
      this.subscriptionNewImport.unsubscribe()
      this.subscriptionDeleteCitizens.unsubscribe()
  }
}
