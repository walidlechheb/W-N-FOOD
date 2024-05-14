import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

const ReservationPDF = ({ details }) => {
    const [qrCodeSrc, setQrCodeSrc] = useState('');

    // Generate QR Code
    useEffect(() => {
        const generateQR = async (text) => {
            try {
                const src = await QRCode.toDataURL(text);
                setQrCodeSrc(src);
            } catch (err) {
                console.error('Error generating QR Code', err);
            }
        };

        const detailsString = `Name: ${details.firstName} ${details.lastName}, Date: ${details.date}, Time: ${details.time}, Email: ${details.email}, Phone: ${details.phone},Restaurant:${details.resto},Command:${details.commaned}`;
        generateQR(detailsString);
    }, [details]);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>Reservation Confirmation</Text>
                <View style={styles.detailSection}>
                    <Text>
                        <Text style={styles.detailTitle}>Name: </Text>
                        <Text style={styles.detailText}>{details.firstName} {details.lastName}</Text>
                    </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>
                        <Text style={styles.detailTitle}>Date: </Text>
                        <Text style={styles.detailText}>{details.date}</Text>
                    </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>
                        <Text style={styles.detailTitle}>Time: </Text>
                        <Text style={styles.detailText}>{details.time}</Text>
                    </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>
                        <Text style={styles.detailTitle}>Email: </Text>
                        <Text style={styles.detailText}>{details.email}</Text>
                    </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>
                        <Text style={styles.detailTitle}>Phone: </Text>
                        <Text style={styles.detailText}>{details.phone}</Text>
                    </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>
                        <Text style={styles.detailTitle}>commaned: </Text>
                        <Text style={styles.detailText}>{details.commaned}</Text>
                    </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>
                        <Text style={styles.detailTitle}>Restaurant: </Text>
                        <Text style={styles.detailText}>{details.resto}</Text>
                    </Text>
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.detailTitle}>QR Code:</Text>
                    {qrCodeSrc && <Image style={styles.qrCode} src={qrCodeSrc} />}
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 30,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333333',
    },
    detailSection: {
        margin: 5,
        marginBottom: 10,
        fontSize: 16,

    },
    detailTitle: {
        fontSize: 18,
        marginBottom: 3,
        color: '#444444',
    },
    detailText: {
        fontSize: 14,
        color: '#666666',
    },
    qrCode: {
        borderBottom: '1 solid #eeeeee',
        marginTop: 10,
        maxWidth: 100,
        maxHeight: 100,
    }
});

export default ReservationPDF;
