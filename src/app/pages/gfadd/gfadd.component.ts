import { Component, OnInit } from '@angular/core';
import { GF, HJQK } from '../../model/gf.class';
import { User } from '../../model/user.class';
import * as _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HouseService } from '../../services/house.service';
import { ActivatedRoute, Router } from '@angular/router';

import '../../../assets/orgchart.js';
declare var OrgChart: any;

@Component({
  selector: 'app-gfadd',
  templateUrl: './gfadd.component.html',
  styleUrls: ['./gfadd.component.scss'],
  providers: [HouseService]
})
export class GfaddComponent implements OnInit {
  //
  savinghouse: boolean = false;
  sfzh_ok: boolean = true;
  zzqyr_ok: boolean = true;
  sfzh_mzc: boolean = true;
  //
  isUpdate: boolean = false;

  // 家庭成员信息
  groupArray = [];
  currentNode = null;
  isSeeFamily: boolean = false;
  isEditFamily: boolean = false;
  familyChart: any = null;
  showFamily: boolean = false;
  person: HJQK = new HJQK();
  familyNodes = [];

  gf: GF = new GF();

  constructor(private serv: HouseService, private message: NzMessageService, private route: ActivatedRoute, private router: Router) {
    this.initInfo();
  }

  initFamilyTree(startNode=[]) {
    OrgChart.templates.binary = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.binary.size = [100, 36];
    OrgChart.templates.binary.node = '<rect width="100" height="36" fill="#ff6600"></rect>';
    OrgChart.templates.binary.plus = '';
    OrgChart.templates.binary.minus = '';
    OrgChart.templates.binary.field_0 = '<text fill="#ffffff" x="10" y="23" text-anchor="start">{val}</text>';
    OrgChart.templates.binary.field_1 = '<text x="90" y="23" text-anchor="end" fill="#00ffff">{val}</text>';
    OrgChart.templates.binary.nodeMenuButton = `
    <g style="cursor:pointer;" transform="matrix(1,0,0,1,100,0)" control-node-menu-id="{id}">
      <rect width="10" height="36" x="0" fill="#2A3D62"></rect>
      <circle cx="5" cy="15" r="2" fill="#ffffff"></circle>
      <circle cx="5" cy="20" r="2" fill="#ffffff"></circle>
      <circle cx="5" cy="25" r="2" fill="#ffffff"></circle>
    </g>`;
    //OrgChart.templates.binary.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>';
    // tslint:disable-next-line: max-line-length
    OrgChart.templates.binary.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;background-color:#f1f1f1;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>';
    
    // 夫妻的模板
    OrgChart.templates.fqs = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.fqs.size = [200, 36];
    OrgChart.templates.fqs.node = '<rect width="200" height="36" fill="#990000"></rect>';
    OrgChart.templates.fqs.plus = '';
    OrgChart.templates.fqs.minus = '';
    OrgChart.templates.fqs.field_0 = '<text fill="#ffffff" x="10" y="23" text-anchor="start">{val}</text>';
    OrgChart.templates.fqs.field_1 = '<text x="90" y="23" text-anchor="end" fill="#00ffff">{val}</text>';
    OrgChart.templates.fqs.field_2 = '<text x="110" y="23" text-anchor="start" fill="#ffffff">{val}</text>';
    OrgChart.templates.fqs.field_3 = '<text x="190" y="23" text-anchor="end" fill="#00ffff">{val}</text>';
    OrgChart.templates.fqs.nodeMenuButton = '';
    // OrgChart.templates.fqs.nodeMenuButton = `
    // <g style="cursor:pointer;" transform="matrix(1,0,0,1,200,0)" control-node-menu-id="{id}">
    //   <rect width="10" height="36" x="0" fill="#2A3D62"></rect>
    //   <circle cx="5" cy="15" r="2" fill="#ffffff"></circle>
    //   <circle cx="5" cy="20" r="2" fill="#ffffff"></circle>
    //   <circle cx="5" cy="25" r="2" fill="#ffffff"></circle>
    // </g>`;
    //OrgChart.templates.binary.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>';
    // tslint:disable-next-line: max-line-length
    OrgChart.templates.fqs.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;background-color:#f1f1f1;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>';
    

    // OrgChart.templates.group_grey=Object.assign({},OrgChart.templates.group_orange);
    OrgChart.templates.group_grey.node='<rect rx="5" x="0" y="0" height="{h}" width="{w}" stroke-dasharray="10" fill="#ffffff" stroke-width="1" stroke="#F57C00"></rect>';
    OrgChart.templates.group_grey.groupName='';
    OrgChart.MAXIMIZE='';
    OrgChart.MINIMIZE='';
    OrgChart.templates.group_grey.size = [250, 50]
    OrgChart.templates.group_grey.groupPadding = [0, 0, 0, 0];
    OrgChart.templates.group_grey.groupNodesSeparation = 20;

    if(startNode.length == 0){
      let sNode = new HJQK();
      sNode.xm = '姓名';
      sNode.gx = '本人';
      startNode.push(sNode);
    }

    const chart = new OrgChart(document.getElementById('orgchart'), {
      enableSearch: false,
      template: 'binary',
      nodeMouseClick: (node) => {
        return false;
      },
      tags: {
        fq: {
          template: 'fqs'
        },
      },
      nodeMenu: {
        // detailLL: {
        //   text: "查看信息",
        //   icon: OrgChart.icon.details(20, 20, '#2A3D62'),
        //   onClick: (nodeId) => {
        //     const nodeData = chart.get(nodeId);
        //     this.isSeeFamily = true;
        //     this.person = nodeData;
        //   }
        // },
        // addLL: {
        //   text: "添加同级",
        //   icon: OrgChart.icon.addInGroup(20, 20, '#2A3D62'),
        //   onClick: (nodeId) => {
        //     const nodeData = chart.get(nodeId);
        //     this.showFamily = true;
        //     this.isEditFamily = false;
        //     this.person = new HJQK();
        //     this.person.pid = nodeData.pid;
        //     this.currentNode = nodeData;
        //   }
        // },
        // addL2: {
        //   text: "添加下级",
        //   icon: OrgChart.icon.addAsChild(20, 20, '#2A3D62'),
        //   onClick: (nodeId) => {
        //     const nodeData = chart.get(nodeId);
        //     this.showFamily = true;
        //     this.isEditFamily = false;
        //     this.person = new HJQK();
        //     this.person.pid = nodeData.id;
        //     this.currentNode = nodeData;
        //   }
        // },
        // editLL: {
        //   text: "编辑信息",
        //   icon: OrgChart.icon.edit(20, 20, '#2A3D62'),
        //   onClick: (nodeId) => {
        //     const nodeData = chart.get(nodeId);
        //     this.showFamily = true;
        //     this.isEditFamily = true;
        //     this.person = nodeData;
        //     this.currentNode = nodeData;
        //   }
        // },
        // delPL: {
        //   text: "删除配偶",
        //   icon: OrgChart.icon.remove(20, 20, '#2A3D62'),
        //   onClick: (nodeId) => {
        //     const nodeData = chart.get(nodeId);
        //     nodeData.tags = null;
        //     nodeData.fq = null;
        //     this.familyChart.updateNode(nodeData);
        //   }
        // },
        // delLL: {
        //   text: "删除信息",
        //   icon: OrgChart.icon.remove(20, 20, '#2A3D62'),
        //   onClick: (nodeId) => {
        //     this.familyChart.removeNode(nodeId);
        //   }
        // },
      },
      nodeBinding: {
        field_0: 'xm',
        field_1: 'gx',
        field_2: (sender, node) => {
          const data = sender.get(node.id);
          if (data['fq']) {
            return data['fq']['xm']
          }
          return '';
        },
        field_3: (sender, node) => {
          const data = sender.get(node.id);
          if (data['fq']) {
            return data['fq']['gx']
          }
          return '';
        }
      },
      nodes: startNode
    });
    this.familyChart = chart;
  }

  /** 家庭成员 */
  closeEdit() {
    this.showFamily = false;
    this.isSeeFamily = false;
  }
  saveEdit() {
    if (!this.isSeeFamily) {
      // 添加
      if (!this.isEditFamily) {
        if (this.person.gx === '配偶') {
          this.currentNode.tags = ['fq'];
          this.currentNode.fq = this.person;
          this.familyChart.updateNode(this.currentNode);
        } else {
          this.familyChart.addNode(this.person);
        }
      } else {
        this.familyChart.updateNode(this.currentNode);
      }
    }
    this.isSeeFamily = false;
    this.showFamily = false;
  }
  /** 家庭成员----END */

  savePersonList(ev){
    console.log(ev);
    // if()
    this.initFamilyTree(ev);
  }

  async initInfo() {
    let id = this.route.snapshot.params["id"];
    let res:any = await this.serv.getInfoById(id);
    if(res.code == 200){
      this.gf = JSON.parse(res.data.detail);
      this.gf.Id = res.data.Id;
      this.isUpdate = true;
      this.initFamilyTree(this.gf.jtcy);
    }
    if(!this.isUpdate){
      
    }
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.familyChart.destroy();
  }

  saveInfo() {
    this.gf.jtcy = [];
    for (let nid in this.familyChart.nodes) {
      let nd = this.familyChart.get(nid);
      this.gf.jtcy.push(nd);
    }

    if(this.isUpdate){
      this.serv.modifyInfo(this.gf.Id, '1', '', '', JSON.stringify(this.gf)).then((res:any)=>{
        this.savinghouse = false;
        if(res.code == 200){
          this.message.create('success', "保存成功！");
          setTimeout(()=>{
            this.router.navigate(['/main']);
          }, 1000);
        }else{
          if(res.code == 400){
            this.sfzh_mzc = false;
          }
          this.message.create('error', res.mes);
        }
      }).catch((err)=>{
        this.savinghouse = false;
        this.message.create('error', "服务器内部错误！");
      });
    }else{
      this.serv.addInfo('1', '', '', JSON.stringify(this.gf)).then((res:any)=>{
        this.savinghouse = false;
        if(res.code == 200){
          this.message.create('success', "保存成功！");
          setTimeout(()=>{
            this.router.navigate(['/main']);
          }, 1000);
        }else{
          if(res.code == 400){
            this.sfzh_mzc = false;
          }
          this.message.create('error', res.mes);
        }

      }).catch((err)=>{
        this.savinghouse = false;
        this.message.create('error', "服务器内部错误！");
      });
    }
  }

}
