import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable } from 'rxjs';
import { TestService } from 'src/app/services/test.service';

export interface NodeWithMap {
  name: string
  city_id: number
  children: Map<string, NodeWithMap>
  citizens?: any[]
}

export interface Node {
  city_id: number
  name: string
  children?: any[]
  citizens?: any[]
}

interface TreeNode {
  expandable: boolean;
  city_id: number;
  name: string;
  level: number;
}

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

  constructor(private test: TestService) {
  }

  hasChild = (_: number, node: TreeNode) => node.expandable;

  ngOnInit() {
    const root = this.construcTree(this.test.getData())
    console.log(this.traversal(root))
    this.dataSource.data = this.traversal(root).children!
    console.log(this.dataSource.data)
  }

  construcTree(arrayCitizen: any[]) {
    let root: NodeWithMap = { name: 'root', city_id: 0, children: new Map<string, NodeWithMap> }
    for (let citizen of arrayCitizen) {
      let current = root
      for (let group of citizen.groups) {
        if (!current.children.has(group.name)) {
          current.children.set(group.name, { name: group.name, city_id: citizen.city_id, children: new Map<string, NodeWithMap> })
        }
        current = current.children.get(group.name)!
      }
      if (!current.citizens) {
        current.citizens = [citizen]
      } else {
        current.citizens?.push(citizen)
      }
    }
    return root
  }

  traversal(node: NodeWithMap): Node {
    if (node.citizens) {
      return { name: node.name, city_id: node.city_id, children: node.citizens }
    }
    let array: any[] = []
    for (let value of node.children.values()) {
      array.push(this.traversal(value))
    }
    return { name: node.name, city_id: node.city_id, children: array }
  }
}
