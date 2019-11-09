import { Component, OnInit } from '@angular/core';
import { GF } from "../../../../model/gf.class";
import { HouseService } from '../../../../services/house.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  providers: [HouseService]
})
export class TablesComponent implements OnInit {
  listOfData = [];
  //
  isLoading:boolean = false;
  page = 1;
  pagesize = 5;
  total = 0;

  username = "";
  verifycode = "";
  mapOfExpandedData = {};

  constructor(private serv:HouseService, private router:Router) { 
    this.initInfo();
  }

  buildMap(jtcy){
    let res = [];
    for(let p of jtcy){
      if(!p.pid){
        p.children = [];
        p['key'] = p.id;
        res.push(p);
        if(p.fq){
          p.fq['key'] = p.fq.id;
          p.fq.gx = '‘' + p.xm + '’的' + p.fq.gx;
          res.push(p.fq);
        }
      }
    }
    var findChilds = function(pa){
      for(let p of jtcy){
        if(p.pid && p.pid === pa.id){
          p.children = [];
          findChilds(p);
          p['key'] = p.id;
          if(pa.children){
            if(p.children.length == 0){
              p.children = null;
            }
            pa.children.push(p);
          }
          if(p.fq){
            p.fq['key'] = p.fq.id;
            p.fq.gx = '‘' + p.xm + '’的' + p.fq.gx;
            pa.children.push(p.fq);
          }
        }
      }
    };
    for(let rp of res){
      findChilds(rp);
    }
    console.log(res);
    return res;
  }

  initInfo(){
    this.isLoading = true;
    this.serv.getInfo(this.page, this.username, this.verifycode).then((res:any)=>{
      this.isLoading = false;
      if(res.code == 200){
        let tmp = [];
        for(let d of res.data){
          let dj:GF = JSON.parse(d.detail);
          dj.Id = d.Id;
          // build map data
          if(dj.jtcy){
            dj['mapdata'] = this.buildMap(dj.jtcy);
            dj['mapdata'].forEach(item => {
              this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
            });
          }

          /* let tmpAdds = [];
          if(dj.jtcy){
            for(let per of dj.jtcy){
              if(per.fq){
                tmpAdds.push(per.fq);
              }
            }
            for(let per of tmpAdds){
              dj.jtcy.push(per);
            }
          } */
          tmp.push(dj);
        }
        this.listOfData = tmp;
        //
        this.total = parseInt(res.extra.count);
        this.pagesize = parseInt(res.extra.pagesize);
      }
    }).catch(err=>{
      this.isLoading = false;
    });
  }

  /** */
  convertTreeToList(root) {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: true, parent: node });
        }
      }
    }
    return array;
  }

  visitNode(node, hashMap: { [key: string]: boolean }, array): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }
  collapse(array, data, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  pageChange(ev){
    this.page = ev;
    this.initInfo();
  }

  editInfo(gf:GF){
    this.router.navigate(['/main/gfedit/' + gf.Id]);
  }
  deleteInfo(gf:GF){
    this.isLoading = true;
    this.serv.delInfo(gf.Id).then((res:any)=>{
      this.isLoading = false;
      this.listOfData = _.filter(this.listOfData, d=>{return d.Id != gf.Id});
      
    }).catch((err)=>{
      this.isLoading = false;
    })
  }

  ngOnInit() {
  }

}
