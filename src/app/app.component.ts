import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BVC COLLEGE OF ENGINEERING';
  student: any = { name:'', fatherName:'', dob:'', joinYear:new Date().getFullYear(), address:'' };
  students: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadAll(); }

  async loadAll() {
    try { this.students = await this.http.get<any[]>('http://localhost:5000/api/students').toPromise() || []; }
    catch (err) { console.error(err); }
  }

  async addStudent() {
    try {
      const res: any = await this.http.post('http://localhost:5000/api/students', this.student).toPromise();
      if (res?.success) { this.students.unshift(res.student); this.student = { name:'', fatherName:'', dob:'', joinYear:new Date().getFullYear(), address:'' }; alert('Saved'); }
      else { alert('Save failed: '+(res?.error||'unknown')); }
    } catch (err:any) { console.error(err); alert('Error: '+(err?.message||err)); }
  }
}
