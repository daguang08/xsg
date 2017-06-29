package cn.edu.henu.xsg.routes;


import com.demo.index.IndexController;
import com.jfinal.config.Routes;

public class FrontRoutes extends Routes {

	@Override
	public void config() {
		// TODO Auto-generated method stub
		//首页路由
		add("/", IndexController.class);

	}

}
