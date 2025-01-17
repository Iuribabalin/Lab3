package net.Iuribabalin.services;

import net.Iuribabalin.Model.Point;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


@ManagedBean
@SessionScoped
public class BDClass {

    private DataSource dataSource;

    private Connection connection;

    @PostConstruct
    public void init() throws NamingException {
        initConnection();
    }

    private void initConnection() throws NamingException {
        Context ctx = new InitialContext();
        dataSource = (DataSource) ctx.lookup("java:jboss/web3");

        try {
            connection = dataSource.getConnection();
            connection.createStatement().execute(
                    "create table if not exists results (" +
                            "x float , y float, r float, res text, session_id text)"
            );
        } catch (SQLException e) {
            throw new IllegalStateException("Couldn't create connection", e);
        }
    }

    public void addPointToTable(Point point){

        try {
            if (connection == null)
                initConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(
                    "INSERT INTO results VALUES (?, ?, ?, ?, ?)"
            );
            preparedStatement.setDouble(1,point.getX());
            preparedStatement.setDouble(2,point.getY());
            preparedStatement.setFloat(3,point.getR());
            preparedStatement.setString(4,point.getRes());
            preparedStatement.setString(5,point.getSession_id());
            preparedStatement.execute();
        } catch (NamingException | SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Point> getPoints(String session_id){
        List<Point> pointsList = new ArrayList<>();
        try {
            if (connection == null)
                initConnection();
            ResultSet rs = connection.createStatement().executeQuery("select * from results");
            while (rs.next()) {
                Point point = new Point();
                point.setX(rs.getFloat("x"));
                point.setY(rs.getFloat("y"));
                point.setR(rs.getInt("r"));
                point.setRes(rs.getString("res"));
                if (rs.getString("session_id").equals(session_id)) {
                    pointsList.add(0,point);
                }
            }
        }catch (SQLException | NamingException throwables) {
            throwables.printStackTrace();
        }
        return pointsList;
    }

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}
