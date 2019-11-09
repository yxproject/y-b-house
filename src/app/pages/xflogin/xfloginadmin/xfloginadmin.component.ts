import { Component, OnInit } from '@angular/core';

import '../../../../assets/orgchart.js';
declare var OrgChart:any;

@Component({
  selector: 'app-xfloginadmin',
  templateUrl: './xfloginadmin.component.html',
  styleUrls: ['./xfloginadmin.component.scss']
})
export class XfloginadminComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
    let gnodeId = 100;
    let chart = new OrgChart(document.getElementById('orgchart'), {
      enableSearch: false,
      nodeMouseClick: () => {
        return false;
      },
      dragDropMenu: {
        addInGroup: { text: "Add in group" },
        addAsChild: { text: "Add as child" }
      },
      nodeMenu:{
        details: {text:"查看详情"},
        edit: {text:"编辑"},
        add: {text:"添加下级"},
        remove: {text:"删除"},
        addLL: {
          text: "添加同级",
          icon: "https://balkangraph.com/js/img/2.jpg",
          onClick: (nodeId)=>{
            var nodeData = chart.get(nodeId);
            console.log(nodeData);
            chart.addNode({id: gnodeId++, pid: nodeData.pid, name: "新的", title: "aaaa"});
          }
        }
      },
      nodeBinding: {
        field_0: "name",
        field_1: "title",
        img_0: "img"
      },
      nodes: [
          { id: 1, name: 'Amber McKenzie', title: 'CEO', img: "//balkangraph.com/js/img/empty-img-none.svg" },
          { id: 2, pid: 1, name: 'Ava Field', title: 'CEO', img: "//balkangraph.com/js/img/empty-img-none.svg" },
          { id: 3, pid: 1, name: 'Peter Stevens', title: 'CEO', img: "//balkangraph.com/js/img/empty-img-none.svg" }
      ]
    });
  }

}
