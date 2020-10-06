package net.Iuribabalin.pointDate;

import net.Iuribabalin.Model.Point;
import net.Iuribabalin.services.BDClass;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.naming.NamingException;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@SessionScoped
@ManagedBean
public class PointDateBean implements Serializable {

    UUID session_id = UUID.randomUUID();

    private final BDClass bdClass = new BDClass();

    private Point newPoint;


    public List<Point> getPointsTable(){
        return bdClass.getPoints();
    }
/*
    public List<Point> getPointsTable(){
        return bdClass.getPoints(this.session_id.toString());
    }*/

    public PointDateBean() {
        this.newPoint = new Point();
    }

    public void setLastR(){
        newPoint.setR(getPointsTable().get(0).getR());
    }

    public void doCode(){
        newPoint.setSession_id(session_id.toString());
        bdClass.addPointToTable(newPoint);
        newPoint = new Point();
        setLastR();
    }

    public void setNewPoint(Point newPoint) {
        this.newPoint = newPoint;
    }

    public Point getNewPoint() {
        return newPoint;
    }
}
