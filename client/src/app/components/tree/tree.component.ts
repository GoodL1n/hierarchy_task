import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { NodeWithMap } from 'src/app/models/tree/node-map.model';
import { Node } from 'src/app/models/tree/node.model';
import { TreeNode } from 'src/app/models/tree/tree-node.model';
import { HierarchyService } from 'src/app/services/hierarchy.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

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

  constructor(private hierarchyService: HierarchyService) {
  }

  ngOnInit() {
    this.hierarchyService.getHierarchyOfCitizens().subscribe(tree => {
      this.dataSource.data = tree.children!
      console.log(this.dataSource.data)
    })
  }

  hasChild = (_: number, node: TreeNode) => node.expandable;

}
