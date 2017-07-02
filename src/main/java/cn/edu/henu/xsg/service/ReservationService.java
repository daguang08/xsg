package cn.edu.henu.xsg.service;

import java.util.List;

import cn.edu.henu.xsg.model.Reservation;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

/**
 * 本 demo 仅表达最为粗浅的 jfinal 用法，更为有价值的实用的企业级用法
 * 详见 JFinal 俱乐部: http://jfinal.com/club
 * 
 * BlogService
 * 所有 sql 与业务逻辑写在 Service 中，不要放在 Model 中，更不
 * 要放在 Controller 中，养成好习惯，有利于大型项目的开发与维护
 */
public class ReservationService {
	
	/**
	 * 所有的 dao 对象也放在 Service 中
	 */
	private static final Reservation dao = new Reservation().dao();
	
	public Page<Reservation> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from reservation order by id asc");
	}
	
	public Reservation findById(int id) {
		return dao.findById(id);
	}
	
	public void deleteById(int id) {
		dao.deleteById(id);
	}
	public void save(Record rec) throws Exception {
		StringBuilder sb=new StringBuilder();
		sb.append("select * from reservation t ");
		sb.append("where ");
		sb.append("t.visit_date=");
		sb.append("'");
		sb.append(rec.getStr("visit_date"));
		sb.append("'");
		sb.append(" and t.visit_time=");
		sb.append(rec.getInt("visit_time"));
		List res=Db.find(sb.toString());
		if(res != null && res.size()>0){
			throw new Exception("已存在！");
		}
		else{
			Db.save("reservation", rec);
		}
	}
}
