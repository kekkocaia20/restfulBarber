package springPJrestfuls.restfulBarber.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfigurer implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");   // Spring troverà automaticamente "index.html"
        registry.addViewController("/index").setViewName("index");
        registry.addViewController("/prenotazione").setViewName("prenotazione");
        registry.addViewController("/succes").setViewName("succes");
        registry.addViewController("/tabella").setViewName("tabella");
    }
    
}


