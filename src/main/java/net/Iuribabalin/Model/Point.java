package net.Iuribabalin.Model;

public class Point {
    private float x;
    private float y;
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

    public void setX(float x) {
        this.x = x;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
    }

    public String getSession_id() {
        return session_id;
    }

    public void setY(float y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public String getRes() {
        return res;
    }

    public void check(){
        if((x*x + y*y <= r*r && x >= 0 && y <= 0) ||
                (y-x/2 <= r/2 && x<=0 && y>=0) ||
                (x>=0 && y>=0 && y<=r/2 && x<=r)){
            res =  "Входит";
        }else{
            res = "Не входит";
        }
    }
}
