"use client";
import { useParams, notFound } from "next/navigation";
import data from "@/data/pages/event-detail.json";
import EventDetail from "@/components/EventDetail";
export default function EventDetailPage() {
    const { slug } = useParams();
    const event = data.data.find(event => event.slug === slug);
    if (!event) {
        return notFound();
    } else {
    return <EventDetail data={event} />;
    }
}