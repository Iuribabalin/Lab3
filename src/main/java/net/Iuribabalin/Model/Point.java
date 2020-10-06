package net.Iuribabalin.Model;

public class Point {
    private double x;
    private double y;
    private int r = 4;
    private String session_id;
    private String res;

    public Point(){
    }

    public void setR(int r) {
        this.r = r;
    }

    public void setRes(String res) {
        this.res = res;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public String getSession_id() {
        return session_id;
    }

    public void setY(double y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public String getRes() {
        return res;
    }

    public void check(){

    }
}
