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
		return dao.paginate(pageNumber, pageSize, "select *", "from reservation t where t.is_deleted='0'");
	}
	
	public Reservation findById(String id) {
		return dao.findById(id);
	}
	
	public void deleteById(String id) {
		//dao.deleteById(id);
		//改为假删除 2017-07-21 
		StringBuffer sql=new StringBuffer();
		sql.append("update reservation t ");
		sql.append("set t.is_deleted=");
		sql.append("'1' ");
		sql.append("where t.guid='");
		sql.append(id);
		sql.append("' and t.is_deleted='0'");
		Db.update(sql.toString());
	}
	
	/**
	 * 获取预约列表
	 * @return
	 */
	public List getReservationList(){
		return dao.find("select * from reservation t where t.is_deleted='0'");
	}
	
	/**
	 * 预约记录的保存
	 * @param rec
	 * @throws Exception
	 */
	public String save(Record rec) throws Exception {
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
			String guid=rec.get("guid")+"";
			return guid;
		}
	}

}
