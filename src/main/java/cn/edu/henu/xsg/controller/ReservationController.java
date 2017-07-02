package cn.edu.henu.xsg.controller;

import java.util.Date;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Record;
import cn.edu.henu.xsg.model.Reservation;
import cn.edu.henu.xsg.service.ReservationService;


public class ReservationController extends Controller{
	static ReservationService service = new ReservationService();
	
	public void index() {
		setAttr("blogPage", service.paginate(getParaToInt(0, 1), 10));
		render("blog.html");
	}
	
	public void add() {
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */
	public void save() {
		String unit = "";
		String contacts="";
		String remark="";
		try {
			unit = new String(getPara("unit").getBytes("iso-8859-1"),"utf-8");
			contacts = new String(getPara("contacts").getBytes("iso-8859-1"),"utf-8");
			remark = new String(getPara("remark").getBytes("iso-8859-1"),"utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String phone_num=getPara("phone_num");
		String visit_date=getPara("visit_date");
		String visit_num=getPara("visit_num");
		String visit_time=getPara("visit_time");
		Record rec=new Record();
		rec.set("unit", unit);
		rec.set("contacts", contacts);
		rec.set("phone_num", phone_num);
		rec.set("visit_date", visit_date);
		rec.set("visit_num", visit_num);
		rec.set("visit_time",Integer.parseInt(visit_time));
		rec.set("remark", remark);
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String create_time=df.format(new Date());// new Date()为获取当前系统时间
		rec.set("create_time", create_time);
		try{
			service.save(rec);
			setAttr("result","success");
			setAttr("msg", "保存成功！");
		}catch (Exception e) {
			// TODO: handle exception
			setAttr("result","fail");
			setAttr("msg", "请重新选择日期！");
		}
		
		renderJson();
	}
	
	public void edit() {
		setAttr("blog", service.findById(getParaToInt()));
	}
	
	/**
	 * save 与 update 的业务逻辑在实际应用中也应该放在 serivce 之中，
	 * 并要对数据进正确性进行验证，在此仅为了偷懒
	 */
	public void update() {
		getModel(Reservation.class).update();
		redirect("/blog");
	}
	
	public void delete() {
		service.deleteById(getParaToInt());
		redirect("/blog");
	}
}
